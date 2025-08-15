import { NextRequest, NextResponse } from 'next/server'

// Временные данные продуктов (в продакшене заменить на БД)
const products = [
  {
    id: '1',
    name: "Набор 'День рождения'",
    slug: 'birthday-set',
    price: 1500,
    comparePrice: 2000,
    description: "Яркий набор из 15 шаров для незабываемого дня рождения",
    image: "🎈",
    category: "Наборы",
    inStock: true,
    featured: true,
    rating: 5,
    reviews: 24,
    details: {
      weight: "0.5 кг",
      dimensions: "30x20x15 см",
      material: "Латекс, фольга",
      includes: ["15 воздушных шаров", "Лента", "Инструкция"]
    }
  },
  {
    id: '2',
    name: "Свадебная арка",
    slug: 'wedding-arch',
    price: 5000,
    comparePrice: 6000,
    description: "Элегантная арка из белых и розовых шаров для торжества",
    image: "💒",
    category: "Свадебные",
    inStock: true,
    featured: false,
    rating: 5,
    reviews: 18,
    details: {
      weight: "2.5 кг",
      dimensions: "200x150x50 см",
      material: "Фольга, металл",
      includes: ["Арка", "50 шаров", "Крепления", "Монтаж"]
    }
  },
  {
    id: '3',
    name: "Корпоративное оформление",
    slug: 'corporate-decoration',
    price: 8000,
    comparePrice: 10000,
    description: "Профессиональное оформление для деловых мероприятий",
    image: "🏢",
    category: "Корпоративные",
    inStock: true,
    featured: false,
    rating: 4,
    reviews: 12,
    details: {
      weight: "3.0 кг",
      dimensions: "Настраивается",
      material: "Латекс, фольга, гелий",
      includes: ["Дизайн", "Монтаж", "Демонтаж", "Гелий"]
    }
  },
  {
    id: '4',
    name: "Латексные шары красные",
    slug: 'latex-red-balloons',
    price: 50,
    comparePrice: 75,
    description: "Качественные латексные шары ярко-красного цвета",
    image: "🔴",
    category: "Латексные",
    inStock: true,
    featured: true,
    rating: 5,
    reviews: 156,
    details: {
      weight: "0.1 кг",
      dimensions: "30 см",
      material: "Латекс",
      includes: ["Шар", "Лента"]
    }
  },
  {
    id: '5',
    name: "Фольгированное сердце",
    slug: 'foil-heart',
    price: 200,
    comparePrice: 250,
    description: "Романтичное фольгированное сердце для признаний",
    image: "💖",
    category: "Фольгированные",
    inStock: false,
    featured: true,
    rating: 5,
    reviews: 89,
    details: {
      weight: "0.2 кг",
      dimensions: "25 см",
      material: "Фольга",
      includes: ["Сердце", "Лента", "Гелий"]
    }
  },
  {
    id: '6',
    name: "Цифра на день рождения",
    slug: 'birthday-number',
    price: 300,
    comparePrice: 400,
    description: "Большая фольгированная цифра любого возраста",
    image: "🔢",
    category: "Цифры",
    inStock: true,
    featured: false,
    rating: 4,
    reviews: 67,
    details: {
      weight: "0.3 кг",
      dimensions: "40 см",
      material: "Фольга",
      includes: ["Цифра", "Лента", "Гелий"]
    }
  }
]

// GET /api/products/[id] - получить конкретный продукт
export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const product = products.find(p => p.id === params.id)
    
    if (!product) {
      return NextResponse.json(
        { success: false, error: 'Продукт не найден' },
        { status: 404 }
      )
    }

    return NextResponse.json({
      success: true,
      data: product
    })
  } catch (error) {
    return NextResponse.json(
      { success: false, error: 'Ошибка получения продукта' },
      { status: 500 }
    )
  }
}
