import LibraryClient from "@/components/library-client"

export default function LibraryPage() {
  return (
    <div className="min-h-screen bg-background">
      <div className="mx-auto max-w-6xl px-4 py-8 sm:px-6 lg:px-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold tracking-tight text-foreground">Library</h1>
          <p className="mt-2 text-muted-foreground">Browse and search through all your notes</p>
        </div>
        <LibraryClient />
      </div>
    </div>
  )
}
