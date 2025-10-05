import Seperator from "@/components/Seperator"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { PenTool, Library, Network, Tag, Link2, FileDown, Zap } from "lucide-react"

export default function HelpPage() {
  return (
    <div className="min-h-screen bg-background">
      <div className="mx-auto max-w-4xl px-4 py-8 sm:px-6 lg:px-8">
        <div className="mb-8">
          <h1 className="text-4xl font-bold tracking-tight text-foreground">Help & Documentation</h1>
          <p className="mt-2 text-lg text-muted-foreground">Everything you need to know about using Scriblio</p>
        </div>

        <div className="space-y-8">
          {/* What is Scriblio */}
          <section>
            <h2 className="text-2xl font-bold text-foreground mb-4">What is Scriblio?</h2>
            <Card>
              <CardContent className="pt-6">
                <p className="text-muted-foreground leading-relaxed">
                  Scriblio is a personal note-taking app that combines the free-flowing creativity of drawing tools like
                  Excalidraw with the networked knowledge capabilities of Obsidian. Create visual notes, link ideas
                  together, and explore your knowledge through an interactive graph visualization.
                </p>
                <p className="text-muted-foreground leading-relaxed mt-4">
                  Whether you're brainstorming, sketching diagrams, taking meeting notes, or building a personal
                  knowledge base, Scriblio provides a minimal, distraction-free environment built for speed and
                  creativity.
                </p>
              </CardContent>
            </Card>
          </section>

          <Seperator />

          {/* Core Features */}
          <section>
            <h2 className="text-2xl font-bold text-foreground mb-4">Core Features</h2>
            <div className="grid gap-6">
              <Card>
                <CardHeader>
                  <div className="flex items-center gap-2">
                    <PenTool className="h-5 w-5 text-primary" />
                    <CardTitle>Notes - Free-form Canvas Editor</CardTitle>
                  </div>
                  <CardDescription>Create and edit notes with unlimited creative freedom</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <h4 className="font-semibold text-foreground mb-2">How to Use:</h4>
                    <ul className="list-disc list-inside space-y-1 text-muted-foreground">
                      <li>Click "Notes" in the navbar or "Start Creating" to create a new note</li>
                      <li>Use the canvas to draw, sketch, write text, or add shapes</li>
                      <li>The toolbar provides drawing tools, shapes, text, and selection options</li>
                      <li>Click "Save" to persist your note to the database</li>
                      <li>Your note is automatically saved with a unique ID</li>
                    </ul>
                  </div>
                  <div>
                    <h4 className="font-semibold text-foreground mb-2">Canvas Tools:</h4>
                    <ul className="list-disc list-inside space-y-1 text-muted-foreground">
                      <li>Select tool - Click and drag to select elements</li>
                      <li>Draw tool - Freehand drawing with your mouse or stylus</li>
                      <li>Text tool - Add text boxes anywhere on the canvas</li>
                      <li>Shapes - Add rectangles, circles, arrows, and more</li>
                      <li>Eraser - Remove elements from your canvas</li>
                    </ul>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <div className="flex items-center gap-2">
                    <Library className="h-5 w-5 text-primary" />
                    <CardTitle>Library - Browse & Search</CardTitle>
                  </div>
                  <CardDescription>Find and organize all your notes in one place</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <h4 className="font-semibold text-foreground mb-2">How to Use:</h4>
                    <ul className="list-disc list-inside space-y-1 text-muted-foreground">
                      <li>Click "Library" in the navbar to view all your notes</li>
                      <li>Notes are organized by date (Today, Yesterday, specific dates)</li>
                      <li>Use the search bar to filter notes by title or tags</li>
                      <li>Search is debounced (500ms delay) for optimal performance</li>
                      <li>Click any note card to open it in the editor</li>
                    </ul>
                  </div>
                  <div>
                    <h4 className="font-semibold text-foreground mb-2">Search Tips:</h4>
                    <ul className="list-disc list-inside space-y-1 text-muted-foreground">
                      <li>Search by note title: type any part of the title</li>
                      <li>Search by tags: type tag names to filter notes</li>
                      <li>Search is case-insensitive and matches partial words</li>
                      <li>Results update automatically as you type</li>
                    </ul>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <div className="flex items-center gap-2">
                    <Network className="h-5 w-5 text-primary" />
                    <CardTitle>Graph - Knowledge Visualization</CardTitle>
                  </div>
                  <CardDescription>Explore connections between your notes visually</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <h4 className="font-semibold text-foreground mb-2">How to Use:</h4>
                    <ul className="list-disc list-inside space-y-1 text-muted-foreground">
                      <li>Click "Graph" in the navbar to view your knowledge graph</li>
                      <li>Each node represents a note in your library</li>
                      <li>Lines (edges) show links between connected notes</li>
                      <li>Node size and color indicate the number of tags</li>
                      <li>Click any node to open that note in the editor</li>
                    </ul>
                  </div>
                  <div>
                    <h4 className="font-semibold text-foreground mb-2">Graph Controls:</h4>
                    <ul className="list-disc list-inside space-y-1 text-muted-foreground">
                      <li>Zoom - Use mouse wheel or pinch gesture to zoom in/out</li>
                      <li>Pan - Click and drag the background to move around</li>
                      <li>Drag nodes - Click and drag individual nodes to reposition</li>
                      <li>Hover - Hover over nodes to see note details</li>
                      <li>Click - Click nodes to navigate to that note</li>
                    </ul>
                  </div>
                </CardContent>
              </Card>
            </div>
          </section>

          <Seperator />

          {/* Advanced Features */}
          <section>
            <h2 className="text-2xl font-bold text-foreground mb-4">Advanced Features</h2>
            <div className="grid gap-6">
              <Card>
                <CardHeader>
                  <div className="flex items-center gap-2">
                    <Tag className="h-5 w-5 text-primary" />
                    <CardTitle>Tagging System</CardTitle>
                  </div>
                  <CardDescription>Organize notes with tags for easy categorization</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <h4 className="font-semibold text-foreground mb-2">How to Add Tags:</h4>
                    <ul className="list-disc list-inside space-y-1 text-muted-foreground">
                      <li>Click the "Tags" button in the note editor toolbar</li>
                      <li>Enter tags separated by commas (e.g., "work, project, ideas")</li>
                      <li>Tags are displayed as colored badges below the title</li>
                      <li>Click the X on any badge to remove that tag</li>
                      <li>Tags are searchable in the Library view</li>
                    </ul>
                  </div>
                  <div>
                    <h4 className="font-semibold text-foreground mb-2">Tag Best Practices:</h4>
                    <ul className="list-disc list-inside space-y-1 text-muted-foreground">
                      <li>Use consistent naming conventions (lowercase, no spaces)</li>
                      <li>Keep tags short and descriptive</li>
                      <li>Use 2-5 tags per note for optimal organization</li>
                      <li>Create a personal tagging system that makes sense to you</li>
                    </ul>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <div className="flex items-center gap-2">
                    <Link2 className="h-5 w-5 text-primary" />
                    <CardTitle>Note Linking</CardTitle>
                  </div>
                  <CardDescription>Connect related notes to build a knowledge network</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <h4 className="font-semibold text-foreground mb-2">How to Link Notes:</h4>
                    <ul className="list-disc list-inside space-y-1 text-muted-foreground">
                      <li>Click the "Links" button in the note editor toolbar</li>
                      <li>Search for existing notes by title</li>
                      <li>Click a note to create a bidirectional link</li>
                      <li>Linked notes appear as badges below the title</li>
                      <li>Click any link badge to navigate to that note</li>
                    </ul>
                  </div>
                  <div>
                    <h4 className="font-semibold text-foreground mb-2">Wiki-Style Linking:</h4>
                    <ul className="list-disc list-inside space-y-1 text-muted-foreground">
                      <li>Type [[note-title]] anywhere in your note title</li>
                      <li>If the note exists, it will be automatically linked</li>
                      <li>If the note doesn't exist, a new note will be created</li>
                      <li>This creates a seamless knowledge-building experience</li>
                      <li>Links are bidirectional - both notes reference each other</li>
                    </ul>
                  </div>
                  <div>
                    <h4 className="font-semibold text-foreground mb-2">Why Link Notes?</h4>
                    <ul className="list-disc list-inside space-y-1 text-muted-foreground">
                      <li>Build connections between related ideas</li>
                      <li>Create a personal knowledge graph</li>
                      <li>Discover unexpected relationships in the Graph view</li>
                      <li>Navigate between related notes quickly</li>
                    </ul>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <div className="flex items-center gap-2">
                    <FileDown className="h-5 w-5 text-primary" />
                    <CardTitle>Export to PDF</CardTitle>
                  </div>
                  <CardDescription>Save your notes as PDF files for sharing or archiving</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <h4 className="font-semibold text-foreground mb-2">How to Export:</h4>
                    <ul className="list-disc list-inside space-y-1 text-muted-foreground">
                      <li>Click the "Export" button in the note editor toolbar</li>
                      <li>Your note will be exported as a PDF file</li>
                      <li>The PDF includes your canvas drawing and all content</li>
                      <li>The file is automatically downloaded to your device</li>
                      <li>PDF filename matches your note title</li>
                    </ul>
                  </div>
                  <div>
                    <h4 className="font-semibold text-foreground mb-2">Use Cases:</h4>
                    <ul className="list-disc list-inside space-y-1 text-muted-foreground">
                      <li>Share notes with colleagues or friends</li>
                      <li>Archive important notes for long-term storage</li>
                      <li>Print physical copies of your notes</li>
                      <li>Create backups of critical information</li>
                    </ul>
                  </div>
                </CardContent>
              </Card>
            </div>
          </section>

          <Seperator />

          {/* Tips & Tricks */}
          <section>
            <h2 className="text-2xl font-bold text-foreground mb-4">Tips & Tricks</h2>
            <Card>
              <CardContent className="pt-6">
                <div className="space-y-4">
                  <div className="flex items-start gap-3">
                    <Zap className="h-5 w-5 text-primary mt-0.5 flex-shrink-0" />
                    <div>
                      <h4 className="font-semibold text-foreground mb-1">Use Consistent Tags</h4>
                      <p className="text-muted-foreground text-sm">
                        Develop a personal tagging system early on. Common tags might include: work, personal, ideas,
                        todo, reference, archive.
                      </p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <Zap className="h-5 w-5 text-primary mt-0.5 flex-shrink-0" />
                    <div>
                      <h4 className="font-semibold text-foreground mb-1">Link Liberally</h4>
                      <p className="text-muted-foreground text-sm">
                        Don't hesitate to create links between notes. The more connections you make, the more valuable
                        your knowledge graph becomes.
                      </p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <Zap className="h-5 w-5 text-primary mt-0.5 flex-shrink-0" />
                    <div>
                      <h4 className="font-semibold text-foreground mb-1">Explore the Graph Regularly</h4>
                      <p className="text-muted-foreground text-sm">
                        Visit the Graph view periodically to discover unexpected connections and patterns in your
                        thinking.
                      </p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <Zap className="h-5 w-5 text-primary mt-0.5 flex-shrink-0" />
                    <div>
                      <h4 className="font-semibold text-foreground mb-1">Save Frequently</h4>
                      <p className="text-muted-foreground text-sm">
                        While working on important notes, click Save regularly to ensure your work is persisted to the
                        database.
                      </p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <Zap className="h-5 w-5 text-primary mt-0.5 flex-shrink-0" />
                    <div>
                      <h4 className="font-semibold text-foreground mb-1">Use Descriptive Titles</h4>
                      <p className="text-muted-foreground text-sm">
                        Give your notes clear, descriptive titles. This makes searching easier and helps when viewing
                        the graph.
                      </p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </section>

          <Seperator />

          {/* FAQ */}
          <section>
            <h2 className="text-2xl font-bold text-foreground mb-4">Frequently Asked Questions</h2>
            <div className="space-y-4">
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">How is my data stored?</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground">
                    All your notes are stored in a MongoDB database. Each note includes your canvas content (as JSON),
                    title, tags, links, and timestamps. Your data is persisted securely and can be accessed from any
                    device.
                  </p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">Can I delete notes?</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground">
                    Yes, you can delete notes by going to the library and clicking on the delete button.
                  </p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">What happens if I link to a non-existent note?</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground">
                    When you use the [[note-title]] syntax with a title that doesn't exist, Scriblio automatically
                    creates a new note with that title and links it to your current note. This makes it easy to build
                    out your knowledge base organically.
                  </p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">Can I collaborate with others?</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground">
                    Scriblio is currently designed as a personal note-taking app. Collaboration features are not
                    available at this time, but you can export notes as PDFs to share with others.
                  </p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">Is there a mobile app?</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground">
                    Scriblio is a web application that works in any modern browser. While it's optimized for desktop
                    use, you can access it from mobile devices through your browser. A dedicated mobile app may be
                    considered for future development.
                  </p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">How do I back up my notes?</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground">
                    You can export individual notes as PDFs using the Export button. For a complete backup, you would
                    need to export each note individually. A bulk export feature may be added in future updates.
                  </p>
                </CardContent>
              </Card>
            </div>
          </section>

          <Seperator />

          {/* Getting Started */}
          <section>
            <h2 className="text-2xl font-bold text-foreground mb-4">Getting Started</h2>
            <Card>
              <CardContent className="pt-6">
                <ol className="list-decimal list-inside space-y-3 text-muted-foreground">
                  <li className="leading-relaxed">
                    <span className="font-semibold text-foreground">Create your first note</span> - Click "Notes" or
                    "Start Creating" to open the canvas editor
                  </li>
                  <li className="leading-relaxed">
                    <span className="font-semibold text-foreground">Add content</span> - Draw, sketch, or write on the
                    canvas using the toolbar
                  </li>
                  <li className="leading-relaxed">
                    <span className="font-semibold text-foreground">Give it a title</span> - Click the title field and
                    enter a descriptive name
                  </li>
                  <li className="leading-relaxed">
                    <span className="font-semibold text-foreground">Add tags</span> - Click the Tags button and enter
                    relevant tags
                  </li>
                  <li className="leading-relaxed">
                    <span className="font-semibold text-foreground">Save your work</span> - Click Save to persist your
                    note to the database
                  </li>
                  <li className="leading-relaxed">
                    <span className="font-semibold text-foreground">Create more notes</span> - Repeat the process to
                    build your knowledge base
                  </li>
                  <li className="leading-relaxed">
                    <span className="font-semibold text-foreground">Link related notes</span> - Use the Links button or
                    [[note-title]] syntax to connect ideas
                  </li>
                  <li className="leading-relaxed">
                    <span className="font-semibold text-foreground">Explore the graph</span> - Visit the Graph view to
                    see your knowledge network visualized
                  </li>
                </ol>
              </CardContent>
            </Card>
          </section>
        </div>
      </div>
    </div>
  )
}
