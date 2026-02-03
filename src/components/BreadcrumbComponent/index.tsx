import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";

type BreadcrumbComponentProps = {
  slug: string;
  currentPage: string;
};

const BreadcrumbComponent = ({
  slug,
  currentPage,
}: BreadcrumbComponentProps) => {
  const isHome =
    !currentPage || currentPage.toLowerCase() === "painel administrativo";

  return (
    <Breadcrumb>
      <BreadcrumbList>
        <BreadcrumbItem>
          <BreadcrumbLink href={`/${slug}`}>
            Painel Administrativo
          </BreadcrumbLink>
        </BreadcrumbItem>
        {!isHome && (
          <>
            <BreadcrumbSeparator />
            <BreadcrumbItem>
              <BreadcrumbPage className="capitalize">
                {currentPage}
              </BreadcrumbPage>
            </BreadcrumbItem>
          </>
        )}
      </BreadcrumbList>
    </Breadcrumb>
  );
};

export default BreadcrumbComponent;
