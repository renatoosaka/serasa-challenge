interface Props {
  text: string;
  href?: string;
}

export function Title({ text, href }: Props) {
  return (
    <div className="flex items-center justify-between p-4 mb-4 font-bold bg-gray-100 rounded">
      <span className="text-lg text-gray-600">{text}</span>
      {!!href && (
        <a
          href={href}
          className="p-2 text-sm transition-colors bg-gray-200 rounded hover:bg-gray-300"
        >
          Novo
        </a>
      )}
    </div>
  );
}
