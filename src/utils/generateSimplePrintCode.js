export function generateSimplePrintCode(data) {
  const printItens = data.map(item => {
    return `
    ^XA
    
    ^FO55,25^GB570,255,8^FS
    ^FO70,55^A0,55^FD ${item.PRODUTO}^FS
    )}^FS
    ^FO70,145^A0,35^FD ${item.DESCRICAO.slice(0, 29)}^FS
    ^FO70,185^A0,35^FD ${item.DESCRICAO.slice(30, 59)}^FS
    ^FO70,225^A0,35^FD ${item.DESCRICAO.slice(60, 89)}^FS

    ^XZ
      `.repeat(item.SALDO);
  });
  return printItens;
}
