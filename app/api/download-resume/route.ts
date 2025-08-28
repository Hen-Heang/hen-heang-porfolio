import { NextResponse } from 'next/server'
import { readFileSync, existsSync } from 'fs'
import { join } from 'path'

export async function GET() {
    try {
        // Path to the resume file
        const filePath = join(process.cwd(), 'public', 'Hen_Heang_Personal Application Form_KO_EN.pdf')
        
        // Check if file exists
        if (!existsSync(filePath)) {
            console.error('Resume file not found at:', filePath)
            return NextResponse.json({ error: 'Resume file not found' }, { status: 404 })
        }
        
        console.log('Serving resume from:', filePath)
        
        // Read the file
        const fileBuffer = readFileSync(filePath)
        
        console.log('File size:', fileBuffer.length, 'bytes')
        
        // Return the file as a response
        return new NextResponse(fileBuffer, {
            headers: {
                'Content-Type': 'application/pdf',
                'Content-Disposition': 'attachment; filename="Hen_Heang_CV.pdf"',
                'Content-Length': fileBuffer.length.toString(),
                'Cache-Control': 'no-cache',
            },
        })
    } catch (error) {
        console.error('Error serving resume:', error)
        return NextResponse.json({ 
            error: 'Failed to serve resume',
            details: error instanceof Error ? error.message : 'Unknown error'
        }, { status: 500 })
    }
}
