require 'redcarpet'
require 'erb'
require 'pygmentize'

class PygmentizeHTML < Redcarpet::Render::HTML
  def block_code(code, language)
    Pygmentize.process(code, language)
  end
end

markdown = Redcarpet::Markdown.new(PygmentizeHTML, :fenced_code_blocks => true)

def render(&proc)
  template = ERB.new(File.read('print.html.erb'))
  template.result(binding)
end

Dir.glob('../*.md').each do |markdown_name|
  output = render do
    markdown.render(File.read(markdown_name))
  end

  html_name = markdown_name.sub(/\.md$/, '.html')

  File.open(File.basename(html_name), 'w') do |file|
    file.write(output)
  end
end
