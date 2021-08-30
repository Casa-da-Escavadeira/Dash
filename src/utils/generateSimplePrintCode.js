export function generateSimplePrintCode(data) {
  const printItens = data.map(item => {
    return `
      ^XA
    
      ^FO75,25^GB570,255,8^FS
      ^FO90,55^A0,55^FD ${item.PRODUTO}^FS
      )}^FS
      ^FO90,145^A0,35^FD ${item.DESCRICAO.slice(0, 29)}^FS
      ^FO90,185^A0,35^FD ${item.DESCRICAO.slice(30, 59)}^FS
      ^FO90,225^A0,35^FD ${item.DESCRICAO.slice(60, 89)}^FS

      ^XZ
      `.repeat(item.SALDO);
  });
  return printItens;
}
