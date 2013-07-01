require 'redcarpet'
require 'erb'
require 'pygmentize'

class PygmentizeHTML < Redcarpet::Render::HTML
  def block_code(code, language)
    Pygmentize.process(code, language, ['-O', 'linenos=table'])
  end
end

markdown = Redcarpet::Markdown.new(PygmentizeHTML, :fenced_code_blocks => true)

$file_dir = File.dirname(__FILE__)
project_root = File.join($file_dir, '/../')

def render(&proc)
  template = ERB.new(File.read($file_dir + '/print.html.erb'))
  template.result(binding)
end

markdowns = Dir.glob(project_root + '*/*.md') + Dir.glob(project_root + '*.md')

markdowns.each do |markdown_name|
  output = render do
    markdown.render(File.read(markdown_name))
  end

  html_name = markdown_name.sub(/\.md$/, '.html')

  File.open(File.basename(html_name), 'w') do |file|
    file.write(output)
  end
end
