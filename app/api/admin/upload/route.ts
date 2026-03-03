import { NextResponse } from 'next/server';
import { v2 as cloudinary } from 'cloudinary';
import { getAuthUser } from '@/lib/auth';

// Configure Cloudinary with environment variables
cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET,
});

export async function POST(req: Request) {
    try {
        // 1. Verify Authentication (Admin Only)
        const user = await getAuthUser(req as any);
        if (!user || user.role !== 'admin') {
            return NextResponse.json(
                { error: 'Unauthorized. Admin access required.' },
                { status: 401 }
            );
        }

        // 2. Parse FormData
        const formData = await req.formData();
        const file = formData.get('file') as File | null;

        if (!file) {
            return NextResponse.json(
                { error: 'No file received.' },
                { status: 400 }
            );
        }

        // 3. Convert File to a Node.js Buffer for Cloudinary Upload Stream
        const bytes = await file.arrayBuffer();
        const buffer = Buffer.from(bytes);

        // 4. Upload to Cloudinary using a Promise stream
        const uploadResult = await new Promise((resolve, reject) => {
            const uploadStream = cloudinary.uploader.upload_stream(
                { folder: 'deity_products' }, // Optional folder organization
                (error, result) => {
                    if (error) reject(error);
                    else resolve(result);
                }
            );

            uploadStream.end(buffer);
        });

        // 5. Return the resulting secure URL from Cloudinary
        return NextResponse.json({ url: (uploadResult as any).secure_url }, { status: 200 });

    } catch (error) {
        console.error('Error uploading image to Cloudinary:', error);
        return NextResponse.json(
            { error: 'Failed to upload image', details: error },
            { status: 500 }
        );
    }
}
