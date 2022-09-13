import { useRouter } from "next/router";
import React from "react";
import Layout from "../components/Layout";

export default function Unauthorized() {
  const router = useRouter();
  const { message } = router.query;

  return (
    <Layout title="Unauthorized Page">
      <h1 className="text-xl font-bold">Access Denied</h1>
      {message && <div className="mb-4 text-red-600">{message}</div>}
    </Layout>
  );
}
