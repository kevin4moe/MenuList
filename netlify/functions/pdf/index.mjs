import { jsPDF } from "jspdf";
import "jspdf-autotable";

export const handler = async function (event, context) {
  const doc = new jsPDF();
  console.log("event", event.headers["x-language"]);
  console.log("event", event.headers["x-language"] === "es-MX");

  const products = [
    {
      ids: "b871487c-71ab-4f02-b284-274444cfde4d",
      name: "a",
      category: "Alimentos",
      unit: "kg",
      quantity: 2,
      price: 25,
      total: 50,
    },
    {
      ids: "598456c3-8440-411c-9b06-092046d7eb9c",
      name: "b",
      category: "Alimentos",
      unit: "kg",
      quantity: 5,
      price: 10,
      total: 50,
    },
  ];

  const body = products.map((product) => [
    product.name,
    product.category,
    product.price,
    product.quantity,
    product.unit,
    product.total,
  ]);

  const total = products.reduce((acc, product) => acc + product.total, 0);

  body.push(["", "", "", "", "Total", total]);

  const d = new Date().toLocaleString("es-MX").split(", ");
  doc.text(`Lista de compras: ${d[0]} a las ${d[1]}`, 10, 10);

  console.log("d", d);
  // doc.autoTable({
  //   head: [["Producto", "Categoria", "Precio", "Cantidad", "Unidad", "Total"]],
  //   body,
  // });

  const body64 = doc.output("datauristring");
  console.log("64 doc", body64);

  return {
    headers: {
      "Access-Control-Allow-Origin": "*",
      "Content-Type": "application/pdf",
    },
    statusCode: 200,
    body: "body64",
    isBase64Encoded: true,
  };
};
