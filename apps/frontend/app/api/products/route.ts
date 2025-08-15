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
    reviews: 24
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
    reviews: 18
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
    reviews: 12
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
    reviews: 156
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
    reviews: 89
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
    reviews: 67
  }
]

// GET /api/products - получить список продуктов
export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const category = searchParams.get('category')
    const search = searchParams.get('search')
    const featured = searchParams.get('featured')
    const inStock = searchParams.get('inStock')
    const minPrice = searchParams.get('minPrice')
    const maxPrice = searchParams.get('maxPrice')
    const sortBy = searchParams.get('sortBy') || 'name'
    const sortOrder = searchParams.get('sortOrder') || 'asc'

    let filteredProducts = [...products]

    // Фильтрация по категории
    if (category && category !== 'all') {
      filteredProducts = filteredProducts.filter(product => 
        product.category.toLowerCase() === category.toLowerCase()
      )
    }

    // Поиск по названию
    if (search) {
      filteredProducts = filteredProducts.filter(product =>
        product.name.toLowerCase().includes(search.toLowerCase()) ||
        product.description.toLowerCase().includes(search.toLowerCase())
      )
    }

    // Только избранные товары
    if (featured === 'true') {
      filteredProducts = filteredProducts.filter(product => product.featured)
    }

    // Только в наличии
    if (inStock === 'true') {
      filteredProducts = filteredProducts.filter(product => product.inStock)
    }

    // Фильтрация по цене
    if (minPrice) {
      filteredProducts = filteredProducts.filter(product => 
        product.price >= parseFloat(minPrice)
      )
    }
    if (maxPrice) {
      filteredProducts = filteredProducts.filter(product => 
        product.price <= parseFloat(maxPrice)
      )
    }

    // Сортировка
    filteredProducts.sort((a, b) => {
      let aValue: any = a[sortBy as keyof typeof a]
      let bValue: any = b[sortBy as keyof typeof b]

      if (sortBy === 'price') {
        aValue = parseFloat(aValue)
        bValue = parseFloat(bValue)
      }

      if (sortOrder === 'asc') {
        return aValue > bValue ? 1 : -1
      } else {
        return aValue < bValue ? 1 : -1
      }
    })

    // Получаем уникальные категории для фильтров
    const categories = [...new Set(products.map(product => product.category))]

    return NextResponse.json({
      success: true,
      data: {
        products: filteredProducts,
        total: filteredProducts.length,
        categories,
        filters: {
          category,
          search,
          featured,
          inStock,
          minPrice,
          maxPrice,
          sortBy,
          sortOrder
        }
      }
    })
  } catch (error) {
    return NextResponse.json(
      { success: false, error: 'Ошибка получения продуктов' },
      { status: 500 }
    )
  }
}