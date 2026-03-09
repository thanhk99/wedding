import { NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'

export async function POST(request: Request) {
  try {
    const body = await request.json()
    const { name, message, isGifted, amount } = body

    if (!name) {
      return NextResponse.json(
        { error: 'Name is required' },
        { status: 400 }
      )
    }

    const wish = await prisma.wish.create({
      data: {
        name,
        message: message || '',

        isGifted: !!isGifted,
        amount: amount ? parseInt(amount) : null,
      },
    })

    return NextResponse.json(wish, { status: 201 })
  } catch (error) {
    console.error('Error creating wish:', error)
    return NextResponse.json(
      { error: 'Internal Server Error' },
      { status: 500 }
    )
  }
}

export async function GET() {
  try {
    const wishes = await prisma.wish.findMany({
      orderBy: {
        createdAt: 'desc',
      },
    })
    return NextResponse.json(wishes)
  } catch (error) {
    console.error('Error fetching wishes:', error)
    return NextResponse.json(
      { error: 'Internal Server Error' },
      { status: 500 }
    )
  }
}
