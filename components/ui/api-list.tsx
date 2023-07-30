"use client";

import ApiAlert from "@/components/ui/api-alert";
import UseOrigin from "@/hooks/use-origin";
import { useParams, useRouter } from "next/navigation";

interface ApiListProps {
  entityName: string;
  entityIdName: string;
}

function ApiList({ entityName, entityIdName }: ApiListProps) {
  const params = useParams();
  const router = useRouter();
  const origin = UseOrigin();

  const baseUrl = `${origin}/api/${params.storeId}`;

  return (
    <>
      <ApiAlert
        title="GET"
        variant="public"
        description={`${baseUrl}/${entityName}`}
      />
      <ApiAlert
        title="GET"
        variant="public"
        description={`${baseUrl}/${entityName}/{${entityIdName}}`}
      />
      <ApiAlert
        title="POST"
        variant="admin"
        description={`${baseUrl}/${entityName}`}
      />
      <ApiAlert
        title="PATCH"
        variant="admin"
        description={`${baseUrl}/${entityName}/{${entityIdName}}`}
      />
      <ApiAlert
        title="DELETE"
        variant="admin"
        description={`${baseUrl}/${entityName}/{${entityIdName}}`}
      />
    </>
  );
}

export default ApiList;
