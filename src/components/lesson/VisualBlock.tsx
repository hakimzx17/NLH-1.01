type VisualBlockProps = {
  title: string;
  description: string;
  svgContent: string;
};

export function VisualBlock({ title, description, svgContent }: VisualBlockProps) {
  return (
    <div className="visual-block">
      <h3 className="visual-block__title">{title}</h3>
      <p className="visual-block__description">{description}</p>
      <div
        className="visual-block__svg"
        dangerouslySetInnerHTML={{ __html: svgContent }}
        role="img"
        aria-label={title}
      />
    </div>
  );
}
