'use client';

import { createClient } from "@/lib/supabase/server";
import { ExcelImporter } from "@/components/admin/excel-importer";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Download, FileSpreadsheet, AlertCircle } from 'lucide-react';
import { Button } from "@/components/ui/button";

export default async function ImportPage() {
  const supabase = await createClient();

  // Obtener categorías para el mapeo
  const { data: categories } = await supabase
    .from("categories")
    .select("*")
    .order("name");

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-white">Importar Productos desde Excel</h1>
        <p className="text-gray-400">Carga productos masivamente desde un archivo Excel</p>
      </div>

      {/* Instrucciones */}
      <Card className="bg-gray-900 border-gray-800">
        <CardHeader>
          <CardTitle className="text-white flex items-center gap-2">
            <AlertCircle className="h-5 w-5 text-orange-500" />
            Instrucciones de Importación
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="text-gray-300">
            <h3 className="font-semibold mb-2">Formato requerido del archivo Excel:</h3>
            <ul className="list-disc list-inside space-y-1 text-sm">
              <li>La primera fila debe contener los encabezados de columna</li>
              <li>Columnas requeridas: <code className="bg-gray-800 px-1 rounded">nombre</code>, <code className="bg-gray-800 px-1 rounded">precio</code>, <code className="bg-gray-800 px-1 rounded">stock</code></li>
              <li>Columnas opcionales: <code className="bg-gray-800 px-1 rounded">descripcion</code>, <code className="bg-gray-800 px-1 rounded">categoria</code>, <code className="bg-gray-800 px-1 rounded">marca</code>, <code className="bg-gray-800 px-1 rounded">modelo</code>, <code className="bg-gray-800 px-1 rounded">sku</code></li>
              <li>Los precios deben ser números (sin símbolos de moneda)</li>
              <li>El stock debe ser un número entero</li>
              <li>Las categorías deben coincidir exactamente con las existentes</li>
            </ul>
          </div>
          
          <div className="flex gap-4">
            <Button
              onClick={() => {
                // Crear y descargar plantilla Excel
                const csvContent = "nombre,descripcion,precio,stock,categoria,marca,modelo,sku\nEjemplo Producto,Descripción del producto,25000,10,Neumáticos,Michelin,XM2,MICH-001";
                const blob = new Blob([csvContent], { type: 'text/csv' });
                const url = window.URL.createObjectURL(blob);
                const a = document.createElement('a');
                a.href = url;
                a.download = 'plantilla_productos.csv';
                a.click();
                window.URL.revokeObjectURL(url);
              }}
              variant="outline"
              className="border-gray-700 text-gray-300 hover:bg-gray-800"
            >
              <Download className="mr-2 h-4 w-4" />
              Descargar Plantilla CSV
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Importador */}
      <Card className="bg-gray-900 border-gray-800">
        <CardHeader>
          <CardTitle className="text-white flex items-center gap-2">
            <FileSpreadsheet className="h-5 w-5 text-orange-500" />
            Importar Archivo
          </CardTitle>
        </CardHeader>
        <CardContent>
          <ExcelImporter categories={categories || []} />
        </CardContent>
      </Card>
    </div>
  );
}
