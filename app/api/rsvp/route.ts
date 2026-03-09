import { NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'

export async function POST(request: Request) {
  try {
    const body = await request.json()
    const { name, guests, message } = body

    if (!name || !guests) {
      return NextResponse.json(
        { error: 'Name and number of guests are required' },
        { status: 400 }
      )
    }

    const rsvp = await prisma.rSVP.create({
      data: {
        name,
        guests,
        message: message || '',
      },
    })

    return NextResponse.json(rsvp, { status: 201 })
  } catch (error) {
    console.error('Error creating RSVP:', error)
    return NextResponse.json(
      { error: 'Internal Server Error' },
      { status: 500 }
    )
  }
}
