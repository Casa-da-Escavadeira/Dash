export function generateSimplePrintCode(data) {
  const printItens = data.map(item => {
    return `
    ^XA
    
    ^FO35,25^GB570,255,8^FS
    ^FO50,55^A0,55^FD ${item.PRODUTO}^FS
    )}^FS
    ^FO50,145^A0,35^FD ${item.DESCRICAO.slice(0, 30)}^FS
    ^FO50,185^A0,35^FD ${item.DESCRICAO.slice(30, 60)}^FS
    ^FO50,225^A0,35^FD ${item.DESCRICAO.slice(60, 89)}^FS

    ^XZ
      `.repeat(item.SALDO);
  });
  return printItens;
}
