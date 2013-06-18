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

output = render do
  markdown.render(File.read('chat-room.md'))
end

File.open('chat-room.html', 'w') do |file|
  file.write(output)
end
