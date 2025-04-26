+++
   title = "My Review Title 2"
   date = 2023-04-17
   [extra]
   author = "Your Name"
   +++

# Other Writings

A section is created whenever a directory (or subdirectory) in the content section contains an _index.md file. If a directory does not contain an _index.md file, no section will be created, but Markdown files within that directory will still create pages (known as orphan pages).

The homepage (i.e., the page displayed when a user browses to your base_url) is a section, which is created whether or not you add an _index.md file at the root of your content directory. If you do not create an _index.md file in your content directory, this main content section will not have any content or metadata. If you would like to add content or metadata, you can add an _index.md file at the root of the content directory and edit it just as you would edit any other _index.md file; your index.html template will then have access to that content and metadata.

Any non-Markdown file in a section directory is added to the assets collection of the section, as explained in the content overview. These files are then available in the Markdown file using relative links.
🔗Drafting

Just like pages sections can be drafted by setting the draft option in the front matter. By default this is not done. When a section is drafted it's descendants like pages, subsections and assets will not be processed unless the --drafts flag is passed. Note that even pages that don't have a draft status will not be processed if one of their parent sections is drafted.
🔗Front matter

The _index.md file within a directory defines the content and metadata for that section. To set the metadata, add front matter to the file.

The TOML front matter is a set of metadata embedded in a file at the beginning of the file enclosed by triple pluses (+++).

After the closing +++, you can add content, which will be parsed as Markdown and made available to your templates through the section.content variable.

Although none of the front matter variables are mandatory, the opening and closing +++ are required.

Note that even though the use of TOML is encouraged, YAML front matter is also supported to ease porting legacy content. In this case the embedded metadata must be enclosed by triple minuses (---).

Here is an example _index.md with all the available variables. The values provided below are the default values.