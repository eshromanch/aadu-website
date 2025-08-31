export interface CombinationPackage {
  id: string;
  title: string;
  components: {
    name: string;
    price: string;
  }[];
  totalPrice: string;
  totalDocuments: number;
  discountedPrice: string;
}

export const combinationPackages: CombinationPackage[] = [
  {
    id: "package-1",
    title: "Diploma Degree + Associate Degree",
    components: [
      { name: "Diploma Degree", price: "$399" },
      { name: "Associate Degree", price: "$749" }
    ],
    totalPrice: "$399+$749=$1148",
    totalDocuments: 20,
    discountedPrice: "$1030"
  },
  {
    id: "package-2",
    title: "Diploma Degree + Bachelor's Degree + Master's Degree",
    components: [
      { name: "Diploma Degree", price: "$399" },
      { name: "Bachelor's Degree", price: "$949" },
      { name: "Master's Degree", price: "$999" }
    ],
    totalPrice: "$399+$949+$999=$2347",
    totalDocuments: 20,
    discountedPrice: "$1030"
  },
  {
    id: "package-3",
    title: "Associate Degree + Bachelor's Degree",
    components: [
      { name: "Associate Degree", price: "$749" },
      { name: "Bachelor's Degree", price: "$949" }
    ],
    totalPrice: "$749+$949=$1698",
    totalDocuments: 20,
    discountedPrice: "$1030"
  },
  {
    id: "package-4",
    title: "Bachelor's Degree + Master's Degree",
    components: [
      { name: "Bachelor's Degree", price: "$949" },
      { name: "Master's Degree", price: "$999" }
    ],
    totalPrice: "$949+$999=$1948",
    totalDocuments: 20,
    discountedPrice: "$1030"
  },
  {
    id: "package-5",
    title: "Master's Degree + Doctorate Degree",
    components: [
      { name: "Master's Degree", price: "$999" },
      { name: "Doctorate Degree", price: "$1299" }
    ],
    totalPrice: "$999+$1299=$2298",
    totalDocuments: 20,
    discountedPrice: "$1030"
  },
  {
    id: "package-6",
    title: "Diploma Degree + Bachelor's Degree",
    components: [
      { name: "Diploma Degree", price: "$399" },
      { name: "Bachelor's Degree", price: "$949" }
    ],
    totalPrice: "$399+$949=$1348",
    totalDocuments: 20,
    discountedPrice: "$1030"
  },
  {
    id: "package-7",
    title: "Associate Degree + Master's Degree",
    components: [
      { name: "Associate Degree", price: "$749" },
      { name: "Master's Degree", price: "$999" }
    ],
    totalPrice: "$749+$999=$1748",
    totalDocuments: 20,
    discountedPrice: "$1030"
  },
  {
    id: "package-8",
    title: "Diploma Degree + Master's Degree",
    components: [
      { name: "Diploma Degree", price: "$399" },
      { name: "Master's Degree", price: "$999" }
    ],
    totalPrice: "$399+$999=$1398",
    totalDocuments: 20,
    discountedPrice: "$1030"
  },
  {
    id: "package-9",
    title: "Bachelor's Degree + Doctorate Degree",
    components: [
      { name: "Bachelor's Degree", price: "$949" },
      { name: "Doctorate Degree", price: "$1299" }
    ],
    totalPrice: "$949+$1299=$2248",
    totalDocuments: 20,
    discountedPrice: "$1030"
  },
  {
    id: "package-10",
    title: "Associate Degree + Doctorate Degree",
    components: [
      { name: "Associate Degree", price: "$749" },
      { name: "Doctorate Degree", price: "$1299" }
    ],
    totalPrice: "$749+$1299=$2048",
    totalDocuments: 20,
    discountedPrice: "$1030"
  }
]; 