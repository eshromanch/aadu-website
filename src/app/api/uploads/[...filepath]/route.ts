import { NextRequest, NextResponse } from 'next/server'
import { readFile } from 'fs/promises'
import path from 'path'

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ filepath: string[] }> }
) {
  try {
    const resolvedParams = await params
    const filepath = resolvedParams.filepath.join('/')
    const fullPath = path.join(process.cwd(), 'public', 'uploads', filepath)
    
    // Basic security check - only allow files from uploads directory
    const normalizedPath = path.normalize(fullPath)
    const uploadsDir = path.join(process.cwd(), 'public', 'uploads')
    
    if (!normalizedPath.startsWith(uploadsDir)) {
      return NextResponse.json({ error: 'Access denied' }, { status: 403 })
    }
    
    const fileBuffer = await readFile(fullPath)
    
    // Determine content type based on file extension
    const ext = path.extname(filepath).toLowerCase()
    let contentType = 'application/octet-stream'
    
    if (ext === '.pdf') contentType = 'application/pdf'
    else if (ext === '.jpg' || ext === '.jpeg') contentType = 'image/jpeg'
    else if (ext === '.png') contentType = 'image/png'
    else if (ext === '.gif') contentType = 'image/gif'
    
    return new NextResponse(new Uint8Array(fileBuffer), {
      headers: {
        'Content-Type': contentType,
        'Content-Disposition': `inline; filename="${path.basename(filepath)}"`,
      },
    })
  } catch (error) {
    console.error('Error serving file:', error)
    return NextResponse.json({ error: 'File not found' }, { status: 404 })
  }
} 