import { revalidatePath, revalidateTag } from 'next/cache';
import { NextRequest, NextResponse } from 'next/server';

export async function POST(req: NextRequest) {
  try {
    const secret = req.nextUrl.searchParams.get('secret') || req.headers.get('x-sanity-secret');
    const configuredSecret = process.env.SANITY_REVALIDATE_SECRET;

    if (configuredSecret && secret !== configuredSecret) {
      return NextResponse.json({ message: 'Invalid secret token' }, { status: 401 });
    }

    let body: any = {};
    try {
      body = await req.json();
    } catch {
      // Body may be empty in manual trigger
    }

    const docType = body?._type;
    const slug = body?.slug?.current || body?.slug;
    const purgeProfile = { expire: 0 };

    if (!docType || docType === 'creation') {
      revalidatePath('/work');
      revalidateTag('creations', purgeProfile);
      revalidateTag('artwork', purgeProfile);
      if (slug) {
        revalidatePath(`/work/${slug}`);
        revalidateTag(`creation:${slug}`, purgeProfile);
      }
    }

    if (!docType || docType === 'offer') {
      revalidatePath('/');
      revalidateTag('offers', purgeProfile);
      revalidateTag('home', purgeProfile);
    }

    if (!docType || docType === 'courseTrack') {
      revalidatePath('/courses');
      revalidateTag('courses', purgeProfile);
      revalidateTag('academy', purgeProfile);
    }

    if (!docType || docType === 'accessoryItem') {
      revalidatePath('/accessories');
      revalidateTag('accessories', purgeProfile);
      revalidateTag('wardrobe', purgeProfile);
    }

    if (!docType || docType === 'worldTerritory') {
      revalidatePath('/world');
      revalidateTag('world', purgeProfile);
      revalidateTag('horizons', purgeProfile);
    }

    if (!docType || docType === 'atelierStep') {
      revalidatePath('/courses');
      revalidateTag('atelier', purgeProfile);
      revalidateTag('process', purgeProfile);
    }

    return NextResponse.json({
      revalidated: true,
      now: Date.now(),
      type: docType || 'all',
      slug: slug || 'all',
    });
  } catch (err: any) {
    return NextResponse.json(
      { message: 'Error revalidating', error: err?.message || String(err) },
      { status: 500 }
    );
  }
}
