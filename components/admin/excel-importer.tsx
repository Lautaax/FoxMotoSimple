"use client";

import { useState, useCallback } from "react";
import { useDropzone } from "react-dropzone";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Upload, FileSpreadsheet, CheckCircle, XCircle, AlertTriangle } from 'lucide-react';
import { createClient } from "@/lib/supabase/client";
import * as XLSX from 'xlsx';

interface Category {
  id: string;
  name: string;
}

interface ProductRow {
  nombre: string;
  descripcion?: string;
  precio: number;
  stock: number;
  categoria?: string;
  marca?: string;
  modelo?: string;
  sku?: string;
  errors: string[];
  status: 'pending' | 'success' | 'error';
}

interface ExcelImporterProps {
  categories: Category[];
}

export function ExcelImporter({ categories }: ExcelImporterProps) {
  const [file, setFile] = useState<File | null>(null);
  const [products, setProducts] = useState<ProductRow[]>([]);
  const [isProcessing, setIsProcessing] = useState(false);
  const [isImporting, setIsImporting] = useState(false);
  const [importProgress, setImportProgress] = useState(0);
  const [importResults, setImportResults] = useState<{
    success: number;
    errors: number;
    total: number;
  } | null>(null);

  const supabase = createClient();

  const onDrop = useCallback((acceptedFiles: File[]) => {
    const file = acceptedFiles[0];
    if (file) {
      setFile(file);
      processFile(file);
    }
  }, []);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: {
      'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet': ['.xlsx'],
      'application/vnd.ms-excel': ['.xls'],
      'text/csv': ['.csv']
    },
    multiple: false
  });

  const processFile = async (file: File) => {
    setIsProcessing(true);
    try {
      const data = await file.arrayBuffer();
      const workbook = XLSX.read(data);
      const sheetName = workbook.SheetNames[0];
      const worksheet = workbook.Sheets[sheetName];
      const jsonData = XLSX.utils.sheet_to_json(worksheet);

      const processedProducts: ProductRow[] = jsonData.map((row: any, index) => {
        const product: ProductRow = {
          nombre: row.nombre || row.Nombre || '',
          descripcion: row.descripcion || row.Descripcion || '',
          precio: parseFloat(row.precio || row.Precio || '0'),
          stock: parseInt(row.stock || row.Stock || '0'),
          categoria: row.categoria || row.Categoria || '',
          marca: row.marca || row.Marca || '',
          modelo: row.modelo || row.Modelo || '',
          sku: row.sku || row.SKU || '',
          errors: [],
          status: 'pending'
        };

        // Validaciones
        if (!product.nombre.trim()) {
          product.errors.push('Nombre es requerido');
        }
        if (isNaN(product.precio) || product.precio <= 0) {
          product.errors.push('Precio debe ser un número mayor a 0');
        }
        if (isNaN(product.stock) || product.stock < 0) {
          product.errors.push('Stock debe ser un número mayor o igual a 0');
        }
        if (product.categoria && !categories.find(c => c.name.toLowerCase() === product.categoria?.toLowerCase())) {
          product.errors.push('Categoría no existe');
        }

        return product;
      });

      setProducts(processedProducts);
    } catch (error) {
      console.error('Error processing file:', error);
      alert('Error al procesar el archivo. Verifica que sea un archivo Excel válido.');
    } finally {
      setIsProcessing(false);
    }
  };

  const importProducts = async () => {
    setIsImporting(true);
    setImportProgress(0);
    
    const validProducts = products.filter(p => p.errors.length === 0);
    let successCount = 0;
    let errorCount = 0;

    for (let i = 0; i < validProducts.length; i++) {
      const product = validProducts[i];
      
      try {
        // Buscar categoría por nombre
        let categoryId = null;
        if (product.categoria) {
          const category = categories.find(c => 
            c.name.toLowerCase() === product.categoria?.toLowerCase()
          );
          categoryId = category?.id || null;
        }

        const productData = {
          name: product.nombre,
          description: product.descripcion || null,
          price: product.precio,
          stock: product.stock,
          category_id: categoryId,
          brand: product.marca || null,
          model: product.modelo || null,
          sku: product.sku || null,
          is_active: true
        };

        const { error } = await supabase
          .from('products')
          .insert([productData]);

        if (error) {
          throw error;
        }

        // Actualizar estado del producto
        setProducts(prev => prev.map(p => 
          p === product ? { ...p, status: 'success' } : p
        ));
        successCount++;
      } catch (error) {
        console.error('Error importing product:', error);
        setProducts(prev => prev.map(p => 
          p === product ? { 
            ...p, 
            status: 'error',
            errors: [...p.errors, 'Error al importar: ' + (error as Error).message]
          } : p
        ));
        errorCount++;
      }

      setImportProgress(((i + 1) / validProducts.length) * 100);
    }

    setImportResults({
      success: successCount,
      errors: errorCount,
      total: validProducts.length
    });
    setIsImporting(false);
  };

  const validProductsCount = products.filter(p => p.errors.length === 0).length;
  const invalidProductsCount = products.filter(p => p.errors.length > 0).length;

  return (
    <div className="space-y-6">
      {/* Dropzone */}
      <div
        {...getRootProps()}
        className={`border-2 border-dashed rounded-lg p-8 text-center cursor-pointer transition-colors ${
          isDragActive 
            ? 'border-orange-500 bg-orange-500/10' 
            : 'border-gray-700 hover:border-gray-600'
        }`}
      >
        <input {...getInputProps()} />
        <FileSpreadsheet className="mx-auto h-12 w-12 text-gray-400 mb-4" />
        {isDragActive ? (
          <p className="text-white">Suelta el archivo aquí...</p>
        ) : (
          <div>
            <p className="text-white mb-2">
              Arrastra un archivo Excel aquí, o haz clic para seleccionar
            </p>
            <p className="text-gray-400 text-sm">
              Formatos soportados: .xlsx, .xls, .csv
            </p>
          </div>
        )}
      </div>

      {/* Procesando archivo */}
      {isProcessing && (
        <div className="text-center py-8">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-orange-500 mx-auto mb-4"></div>
          <p className="text-white">Procesando archivo...</p>
        </div>
      )}

      {/* Resumen de productos */}
      {products.length > 0 && !isProcessing && (
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <Badge variant="secondary" className="bg-green-900 text-green-300">
                {validProductsCount} válidos
              </Badge>
              {invalidProductsCount > 0 && (
                <Badge variant="secondary" className="bg-red-900 text-red-300">
                  {invalidProductsCount} con errores
                </Badge>
              )}
            </div>
            
            {validProductsCount > 0 && !isImporting && !importResults && (
              <Button
                onClick={importProducts}
                className="bg-orange-600 hover:bg-orange-700"
              >
                <Upload className="mr-2 h-4 w-4" />
                Importar {validProductsCount} productos
              </Button>
            )}
          </div>

          {/* Progreso de importación */}
          {isImporting && (
            <div className="space-y-2">
              <div className="flex items-center justify-between text-sm">
                <span className="text-gray-400">Importando productos...</span>
                <span className="text-white">{Math.round(importProgress)}%</span>
              </div>
              <Progress value={importProgress} className="w-full" />
            </div>
          )}

          {/* Resultados de importación */}
          {importResults && (
            <div className="bg-gray-800 rounded-lg p-4">
              <h3 className="text-white font-semibold mb-2">Resultados de Importación</h3>
              <div className="grid grid-cols-3 gap-4 text-center">
                <div>
                  <div className="text-2xl font-bold text-green-400">{importResults.success}</div>
                  <div className="text-sm text-gray-400">Exitosos</div>
                </div>
                <div>
                  <div className="text-2xl font-bold text-red-400">{importResults.errors}</div>
                  <div className="text-sm text-gray-400">Errores</div>
                </div>
                <div>
                  <div className="text-2xl font-bold text-white">{importResults.total}</div>
                  <div className="text-sm text-gray-400">Total</div>
                </div>
              </div>
            </div>
          )}

          {/* Tabla de productos */}
          <div className="rounded-md border border-gray-800 max-h-96 overflow-auto">
            <Table>
              <TableHeader>
                <TableRow className="border-gray-800">
                  <TableHead className="text-gray-300">Estado</TableHead>
                  <TableHead className="text-gray-300">Nombre</TableHead>
                  <TableHead className="text-gray-300">Precio</TableHead>
                  <TableHead className="text-gray-300">Stock</TableHead>
                  <TableHead className="text-gray-300">Categoría</TableHead>
                  <TableHead className="text-gray-300">Errores</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {products.map((product, index) => (
                  <TableRow key={index} className="border-gray-800">
                    <TableCell>
                      {product.status === 'success' && (
                        <CheckCircle className="h-4 w-4 text-green-400" />
                      )}
                      {product.status === 'error' && (
                        <XCircle className="h-4 w-4 text-red-400" />
                      )}
                      {product.status === 'pending' && product.errors.length === 0 && (
                        <div className="h-4 w-4 rounded-full bg-gray-600"></div>
                      )}
                      {product.status === 'pending' && product.errors.length > 0 && (
                        <AlertTriangle className="h-4 w-4 text-yellow-400" />
                      )}
                    </TableCell>
                    <TableCell className="text-white">{product.nombre}</TableCell>
                    <TableCell className="text-white">
                      ${product.precio.toLocaleString('es-AR')}
                    </TableCell>
                    <TableCell className="text-white">{product.stock}</TableCell>
                    <TableCell className="text-white">{product.categoria || '-'}</TableCell>
                    <TableCell>
                      {product.errors.length > 0 && (
                        <div className="space-y-1">
                          {product.errors.map((error, errorIndex) => (
                            <div key={errorIndex} className="text-xs text-red-400">
                              {error}
                            </div>
                          ))}
                        </div>
                      )}
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </div>
      )}
    </div>
  );
}
