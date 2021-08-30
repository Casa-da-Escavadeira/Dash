export function generatePrintCode(data) {
  const printItens = data.map(item => {
    return `
      ^XA
  
      ^FO20,25^GB570,255,8^FS
      ^FO35,55^A0,55^FD ${item.PRODUTO}^FS
      ^FO445,55^A0,25^FD PC ${item.PEDIDO}^FS
      ^FO445,85^A0,25^FD ${new Intl.DateTimeFormat('pt-BR').format(
        Date.now(),
      )}^FS
      ^FO35,145^A0,35^FD ${item.DESCRICAO.slice(0, 29)}^FS
      ^FO35,185^A0,35^FD ${item.DESCRICAO.slice(30, 59)}^FS
      ^FO35,225^A0,35^FD ${item.DESCRICAO.slice(60, 89)}^FS
  
      ^XZ
      `.repeat(item.SALDO);
  });
  return printItens;
}
