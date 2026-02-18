type HeaderPagesProps = {
  title: string;
  description?: string;
  icon?: React.ReactNode;
};

const HeaderPages = ({ title, description, icon }: HeaderPagesProps) => {
  return (
    <header>
      <div className="flex items-center gap-4">
        <div className="hidden rounded-xl bg-primary/50 p-3 text-white sm:block">
          {icon}
        </div>
        <div className="space-y-1">
          <h1 className="text-2xl font-extrabold tracking-tight text-foreground md:text-3xl">
            {title}
          </h1>
          <p className="text-sm text-muted-foreground">{description}</p>
        </div>
      </div>
    </header>
  );
};

export default HeaderPages;
