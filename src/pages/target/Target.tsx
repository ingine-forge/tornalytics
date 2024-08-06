import { Target, columns } from "@/pages/target/columns";
import { DataTable } from "./data-table";
import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";

async function getData(): Promise<Target[]> {
  // Fetch data from your API here.
  return [
    {
      id: 100,
      name: "Target 1",
      status: "Active",
      level: 1,
      lastAction: "2022-01-01",
      strength: 10,
      speed: 5,
      dexterity: 15,
      defense: 20,
      total: 35,
    },
    // ...
  ];
}

const Targets = () => {
  const [data, setData] = useState<Target[]>([]);
  useEffect(() => {
    getTableData();
  }, []);

  const getTableData = async () => {
    const data = await getData();
    setData(data);
  };

  return (
    <div className="container mx-auto pt-10">
      <div className="flex justify-between items-center mb-6">
        <h1>Targets List</h1>
        <Button>Add Target</Button>
      </div>
      <DataTable columns={columns} data={data} />
    </div>
  );
};

export default Targets;
