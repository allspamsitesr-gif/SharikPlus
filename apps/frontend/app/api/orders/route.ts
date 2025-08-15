import { NextRequest, NextResponse } from 'next/server'

// Временное хранилище заказов (в продакшене заменить на БД)
let orders: Order[] = []

interface OrderItem {
  productId: string
  name: string
  price: number
  quantity: number
  image?: string
}

interface Order {
  id: string
  orderNumber: string
  items: OrderItem[]
  total: number
  subtotal: number
  tax: number
  shipping: number
  discount: number
  customerName: string
  customerEmail: string
  customerPhone?: string
  shippingAddress: {
    street: string
    city: string
    postalCode: string
    country: string
  }
  status: 'PLACED' | 'PROCESSING' | 'SHIPPED' | 'DELIVERED' | 'CANCELLED'
  paymentStatus: 'PENDING' | 'PAID' | 'FAILED'
  createdAt: Date
  updatedAt: Date
}

// POST /api/orders - создать новый заказ
export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { 
      items, 
      customerName, 
      customerEmail, 
      customerPhone,
      shippingAddress,
      subtotal = 0,
      tax = 0,
      shipping = 0,
      discount = 0
    } = body

    if (!items || !Array.isArray(items) || items.length === 0) {
      return NextResponse.json(
        { success: false, error: 'Корзина пуста' },
        { status: 400 }
      )
    }

    if (!customerName || !customerEmail) {
      return NextResponse.json(
        { success: false, error: 'Не указаны данные покупателя' },
        { status: 400 }
      )
    }

    // Генерируем номер заказа
    const orderNumber = `ORD-${Date.now()}-${Math.random().toString(36).substr(2, 5).toUpperCase()}`
    
    // Вычисляем общую сумму
    const total = subtotal + tax + shipping - discount

    const newOrder: Order = {
      id: `order-${Date.now()}`,
      orderNumber,
      items,
      total,
      subtotal,
      tax,
      shipping,
      discount,
      customerName,
      customerEmail,
      customerPhone,
      shippingAddress,
      status: 'PLACED',
      paymentStatus: 'PENDING',
      createdAt: new Date(),
      updatedAt: new Date()
    }

    orders.push(newOrder)

    // Здесь можно добавить отправку уведомлений
    // - Email покупателю
    // - Уведомление в админку
    // - WebSocket для real-time обновлений

    return NextResponse.json({
      success: true,
      message: 'Заказ успешно создан',
      data: {
        order: newOrder,
        orderNumber: newOrder.orderNumber
      }
    })
  } catch (error) {
    return NextResponse.json(
      { success: false, error: 'Ошибка создания заказа' },
      { status: 500 }
    )
  }
}

// GET /api/orders - получить заказы (для админки)
export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const status = searchParams.get('status')
    const email = searchParams.get('email')

    let filteredOrders = orders

    // Фильтрация по статусу
    if (status) {
      filteredOrders = filteredOrders.filter(order => order.status === status)
    }

    // Фильтрация по email покупателя
    if (email) {
      filteredOrders = filteredOrders.filter(order => 
        order.customerEmail.toLowerCase().includes(email.toLowerCase())
      )
    }

    // Сортировка по дате создания (новые сначала)
    filteredOrders.sort((a, b) => 
      new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
    )

    return NextResponse.json({
      success: true,
      data: {
        orders: filteredOrders,
        total: filteredOrders.length,
        totalRevenue: filteredOrders.reduce((sum, order) => sum + order.total, 0)
      }
    })
  } catch (error) {
    return NextResponse.json(
      { success: false, error: 'Ошибка получения заказов' },
      { status: 500 }
    )
  }
}
