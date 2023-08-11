import { jsPDF } from "jspdf";
import "jspdf-autotable";

export const handler = async function (event, context) {
  const doc = new jsPDF();
  console.log("event", event.headers["x-language"]);
  console.log("event", event.headers["x-language"] === "es-MX");
  console.log("event", event);
  console.log("event", context);

  const products = event.body
    ? JSON.parse(event.body)
    : [
        {
          ids: "b871487c-71ab-4f02-b284-274444cfde4d",
          name: "a",
          category: "Alimentos",
          unit: "kg",
          quantity: 2,
          price: 25,
          total: 50,
        },
      ];

  console.log("products", products);

  const body = products.items.map((product) => [
    product.name || "",
    product.category || "",
    product.price || "",
    product.quantity || "",
    product.unit || "Total",
    product.total,
  ]);

  const d = products.date;
  doc.text(`Lista de compras: ${d[0]} a las ${d[1]}`, 10, 10);

  doc.autoTable({
    head: [["Producto", "Categoria", "Precio", "Cantidad", "Unidad", "Total"]],
    body,
  });

  const body64 = doc.output("datauristring");

  return {
    headers: {
      "Access-Control-Allow-Origin": "*",
      "Content-Type": "application/pdf",
    },
    statusCode: 200,
    body: body64.split(",")[1],
    isBase64Encoded: true,
  };
};
