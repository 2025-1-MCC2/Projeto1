import jsPDF from 'jspdf';
import autoTable from 'jspdf-autotable';
import { Chart, registerables } from 'chart.js';

Chart.register(...registerables);

export const generateEventReport = async (eventos, userData) => {
  const doc = new jsPDF({
    orientation: 'portrait',
    unit: 'mm',
    format: 'a4'
  });

  const COLORS = {
    primary: '#2C3E50',
    secondary: '#E74C3C',
    accent: '#3498DB',
    lightText: '#7F8C8D',
    border: '#ECF0F1'
  };

  const FONTS = {
    title: 'helvetica',
    body: 'helvetica',
    bold: 'helvetica'
  };

  const currentDate = new Date().toLocaleDateString('pt-BR');

  // ====== CABEÇALHO ======
  doc.setFont(FONTS.title, 'bold');
  doc.setFontSize(14);
  doc.setTextColor(COLORS.accent);
  doc.text('Instituto Criativo', 14, 15);

  doc.setFontSize(20);
  doc.setTextColor(COLORS.primary);
  doc.text('Relatório de Eventos Corporativos', 105, 25, { align: 'center' });

  doc.setFontSize(10);
  doc.setTextColor(COLORS.lightText);
  doc.text(`Gerado por: ${userData.nome}`, 14, 33);
  doc.text(`Data: ${currentDate}`, 105, 33, { align: 'center' });
  doc.text(`Total de eventos: ${eventos.length}`, 196, 33, { align: 'right' });

  // ====== RESUMO ESTATÍSTICO ======
  const stats = [
    { label: 'Eventos Concluídos', value: eventos.filter(e => e.status === 'concluido').length },
    { label: 'Eventos Pendentes', value: eventos.filter(e => e.status === 'pendente').length },
    { label: 'Seus Eventos', value: eventos.filter(e => e.autor_id === userData.id).length },
    { label: 'Eventos de Terceiros', value: eventos.filter(e => e.autor_id !== userData.id).length }
  ];

  doc.setFont(FONTS.bold, 'bold');
  doc.setFontSize(12);
  doc.setTextColor(COLORS.primary);
  doc.text('Resumo Estatístico', 14, 42);

  let xPos = 14;
  stats.forEach(stat => {
    doc.setFillColor(COLORS.border);
    doc.roundedRect(xPos, 46, 45, 20, 3, 3, 'F');

    doc.setFontSize(10);
    doc.setTextColor(COLORS.lightText);
    doc.text(stat.label, xPos + 5, 53);

    doc.setFontSize(14);
    doc.setTextColor(COLORS.secondary);
    doc.text(stat.value.toString(), xPos + 5, 61);

    xPos += 47;
  });

  // ====== TABELA DE EVENTOS ======
  doc.setFontSize(12);
  doc.setTextColor(COLORS.primary);
  doc.text('Detalhamento dos Eventos', 14, 75);

  const tableData = eventos.map(evento => ({
    titulo: evento.titulo,
    descricao: evento.descricao.length > 60 ? evento.descricao.substring(0, 57) + '...' : evento.descricao,
    ano: evento.ano,
    status: formatStatus(evento.status),
    autor: evento.autor_id === userData.id ? 'Você' : `ID ${evento.autor_id}`,
    prioridade: evento.prioridade || 'Média'
  }));

  autoTable(doc, {
    startY: 80,
    head: [[
      'Título', 'Descrição', 'Ano', 'Status', 'Autor', 'Prioridade'
    ]],
    body: tableData.map(item => [
      item.titulo,
      item.descricao,
      item.ano,
      { content: item.status, styles: { textColor: getStatusColor(item.status) } },
      item.autor,
      { content: item.prioridade, styles: { textColor: getPriorityColor(item.prioridade) } }
    ]),
    theme: 'grid',
    headStyles: {
      fillColor: COLORS.primary,
      textColor: '#FFFFFF',
      fontStyle: 'bold',
      halign: 'center'
    },
    bodyStyles: {
      textColor: COLORS.primary,
      fontStyle: 'normal',
      cellPadding: 3
    },
    alternateRowStyles: {
      fillColor: '#F9F9F9'
    },
    styles: {
      fontSize: 9,
      overflow: 'linebreak'
    },
    margin: { left: 14, right: 14 },
    didDrawPage: function (data) {
      doc.setFontSize(8);
      doc.setTextColor(COLORS.lightText);
      doc.text(`Página ${doc.internal.getCurrentPageInfo().pageNumber}`, 105, doc.internal.pageSize.height - 10, { align: 'center' });
    }
  });

  // ====== GRÁFICO DE EVENTOS ======
  const createEventChart = async () => {
    const canvas = document.createElement('canvas');
    canvas.width = 400;
    canvas.height = 200;

    new Chart(canvas.getContext('2d'), {
      type: 'bar',
      data: {
        labels: ['Concluídos', 'Pendentes', 'Seus Eventos', 'Terceiros'],
        datasets: [{
          label: 'Quantidade',
          data: stats.map(s => s.value),
          backgroundColor: ['#27AE60', '#F39C12', '#3498DB', '#9B59B6']
        }]
      },
      options: {
        responsive: false,
        plugins: { legend: { display: false } },
        scales: { y: { beginAtZero: true } }
      }
    });

    await new Promise(resolve => setTimeout(resolve, 500));
    const chartImage = canvas.toDataURL('image/png');

    doc.addPage();
    doc.setFontSize(14);
    doc.setTextColor(COLORS.primary);
    doc.text('Gráfico de Eventos', 105, 20, { align: 'center' });
    doc.addImage(chartImage, 'PNG', 25, 30, 160, 100);
  };

  await createEventChart();

  // ====== RODAPÉ GLOBAL ======
  const totalPages = doc.internal.getNumberOfPages();
  for (let i = 1; i <= totalPages; i++) {
    doc.setPage(i);
    doc.setFontSize(8);
    doc.setTextColor(COLORS.lightText);
    doc.text(
      `© ${new Date().getFullYear()} Instituto Criativo - Sistema Corporativo`,
      105,
      doc.internal.pageSize.height - 5,
      { align: 'center' }
    );
  }

  // ====== SALVAR ======
  const fileName = `Relatorio_Eventos_${userData.nome.replace(/\s/g, '_')}_${currentDate.replace(/\//g, '-')}.pdf`;
  doc.save(fileName);

  // ====== FUNÇÕES AUXILIARES ======
  function formatStatus(status) {
    const map = {
      'concluido': 'Concluído ✅',
      'pendente': 'Pendente ⏳',
      'cancelado': 'Cancelado ❌'
    };
    return map[status] || status;
  }

  function getStatusColor(status) {
    if (status.includes('Concluído')) return '#27AE60';
    if (status.includes('Pendente')) return '#F39C12';
    if (status.includes('Cancelado')) return '#E74C3C';
    return COLORS.primary;
  }

  function getPriorityColor(priority) {
    return {
      'Alta': '#E74C3C',
      'Média': '#F39C12',
      'Baixa': '#27AE60'
    }[priority] || COLORS.primary;
  }
};
