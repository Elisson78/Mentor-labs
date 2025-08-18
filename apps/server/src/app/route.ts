// Root route intentionally returns no content to avoid showing JSON in the browser
export async function GET() {
  return new Response(null, { status: 204 });
}
