import { NextRequest, NextResponse } from 'next/server'

// Временное хранилище корзины (в продакшене заменить на Redis/БД)
let cartItems: CartItem[] = []

interface CartItem {
  id: string
  productId: string
  name: string
  price: number
  quantity: number
  image?: string
}

// GET /api/cart - получить содержимое корзины
export async function GET() {
  try {
    return NextResponse.json({
      success: true,
      data: {
        items: cartItems,
        total: cartItems.reduce((sum, item) => sum + (item.price * item.quantity), 0),
        count: cartItems.reduce((sum, item) => sum + item.quantity, 0)
      }
    })
  } catch (error) {
    return NextResponse.json(
      { success: false, error: 'Ошибка получения корзины' },
      { status: 500 }
    )
  }
}

// POST /api/cart - добавить товар в корзину
export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { productId, name, price, quantity = 1, image } = body

    if (!productId || !name || !price) {
      return NextResponse.json(
        { success: false, error: 'Неверные данные товара' },
        { status: 400 }
      )
    }

    // Проверяем, есть ли уже такой товар в корзине
    const existingItem = cartItems.find(item => item.productId === productId)

    if (existingItem) {
      // Увеличиваем количество
      existingItem.quantity += quantity
    } else {
      // Добавляем новый товар
      cartItems.push({
        id: `${productId}-${Date.now()}`,
        productId,
        name,
        price,
        quantity,
        image
      })
    }

    return NextResponse.json({
      success: true,
      message: 'Товар добавлен в корзину',
      data: {
        items: cartItems,
        total: cartItems.reduce((sum, item) => sum + (item.price * item.quantity), 0),
        count: cartItems.reduce((sum, item) => sum + item.quantity, 0)
      }
    })
  } catch (error) {
    return NextResponse.json(
      { success: false, error: 'Ошибка добавления товара' },
      { status: 500 }
    )
  }
}

// PUT /api/cart - обновить количество товара
export async function PUT(request: NextRequest) {
  try {
    const body = await request.json()
    const { itemId, quantity } = body

    if (!itemId || quantity === undefined) {
      return NextResponse.json(
        { success: false, error: 'Неверные данные' },
        { status: 400 }
      )
    }

    const item = cartItems.find(item => item.id === itemId)
    if (!item) {
      return NextResponse.json(
        { success: false, error: 'Товар не найден' },
        { status: 404 }
      )
    }

    if (quantity <= 0) {
      // Удаляем товар если количество 0 или меньше
      cartItems = cartItems.filter(item => item.id !== itemId)
    } else {
      item.quantity = quantity
    }

    return NextResponse.json({
      success: true,
      message: 'Корзина обновлена',
      data: {
        items: cartItems,
        total: cartItems.reduce((sum, item) => sum + (item.price * item.quantity), 0),
        count: cartItems.reduce((sum, item) => sum + item.quantity, 0)
      }
    })
  } catch (error) {
    return NextResponse.json(
      { success: false, error: 'Ошибка обновления корзины' },
      { status: 500 }
    )
  }
}

// DELETE /api/cart - удалить товар из корзины
export async function DELETE(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const itemId = searchParams.get('itemId')

    if (!itemId) {
      return NextResponse.json(
        { success: false, error: 'ID товара не указан' },
        { status: 400 }
      )
    }

    cartItems = cartItems.filter(item => item.id !== itemId)

    return NextResponse.json({
      success: true,
      message: 'Товар удален из корзины',
      data: {
        items: cartItems,
        total: cartItems.reduce((sum, item) => sum + (item.price * item.quantity), 0),
        count: cartItems.reduce((sum, item) => sum + item.quantity, 0)
      }
    })
  } catch (error) {
    return NextResponse.json(
      { success: false, error: 'Ошибка удаления товара' },
      { status: 500 }
    )
  }
}
