<template>
  <v-container>
    <v-row no-gutters class="d-flex ga-4">
      <v-col>
        <CardDashboard
          title="Redzones"
          description="Quantidade total de redzones"
          icon="mdi mdi-circle-off-outline"
          result="64"
          :date="new Date().toLocaleTimeString('pt-BR')"
        />
      </v-col>
      <v-col>
        <CardDashboard
          title="Departamentos"
          description="Quantidade total de departamentos"
          icon="fa-book"
          result="45"
          :date="new Date().toLocaleTimeString('pt-BR')"
        />
      </v-col>
      <v-col>
        <CardDashboard
          title="Usuários"
          description="Quantidade total de usuários"
          icon="fa-users"
          result="18"
          :date="new Date().toLocaleTimeString('pt-BR')"
        />
      </v-col>
      <v-divider class="py-1 mt-2"></v-divider>
      <v-responsive width="100%"></v-responsive>
      <v-col>
        <CardDashboard
          title="Redzone com mais logs"
          description="Redzone que mais tem logs registrados"
          icon="mdi mdi-circle-off-outline"
          result="Armazém"
          sizeResult="text-h5"
          :date="new Date().toLocaleTimeString('pt-BR')"
        />
      </v-col>
      <v-col>
        <CardDashboard
          title="Usuário com mais redzones"
          description="Usuário que mais tem redzones registrados"
          icon="mdi mdi-account"
          result="Marcelo"
          sizeResult="text-h5"
          :date="new Date().toLocaleTimeString('pt-BR')"
        />
      </v-col>
      <v-col>
        <CardDashboard
          title="Usuário com mais departamentos"
          description="Usuário que mais tem departamentos registrados"
          icon="mdi mdi-account"
          result="Gabriel"
          sizeResult="text-h5"
          :date="new Date().toLocaleTimeString('pt-BR')"
        />
      </v-col>
      <v-col>
        <CardDashboard
          title="Departamento com mais redzones"
          description="Departamento que mais tem redzones registradas"
          icon="fa-book"
          result="Cozinha"
          sizeResult="text-h5"
          :date="new Date().toLocaleTimeString('pt-BR')"
        />
      </v-col>
    </v-row>
    <v-divider class="py-2 mt-5"></v-divider>
    <v-row>
      <v-col>
        <apexchart
          type="pie"
          :options="chartOptions"
          :series="series"
        ></apexchart>
      </v-col>
      <v-col>
        <apexchart
          type="bar"
          :options="chartOptionsBar"
          :series="seriesBar"
        ></apexchart>
      </v-col>
      <v-responsive width="100%"></v-responsive>
      <v-col>
        <apexchart
          type="bar"
          :options="chartOptionsBar2"
          :series="seriesBar2"
        ></apexchart>
      </v-col>
      <v-col>
        <apexchart
          type="bar"
          :options="chartOptionsBar3"
          :series="seriesBar3"
        ></apexchart>
      </v-col>
    </v-row>
    <v-row>
      <v-col>
        <apexchart
          type="line"
          :options="chartOptionsLine"
          :series="seriesLine"
        ></apexchart>
      </v-col>
      <v-col>
        <apexchart
          type="line"
          :options="chartOptionsLine2"
          :series="seriesLine2"
        ></apexchart>
      </v-col>
    </v-row>
  </v-container>
</template>

<script setup lang="ts">
import { reactive } from "vue";
import CardDashboard from "../../components/dashboard/cardDashboard.vue";

const chartOptions = reactive({
  chart: {
    type: "pie",
  },
  title: {
    text: "Tipos de usuários",
    style: {
      fontSize: "18px",
    },
  },
  labels: ["Adm Geral", "Gerente de área", "Guarda"],
  responsive: [
    {
      breakpoint: 300,
      options: {
        chart: {
          width: 200,
        },
        legend: {
          position: "bottom",
        },
      },
    },
  ],
});

const series = [2, 5, 13];

const chartOptionsBar = reactive({
  chart: {
    type: "bar",
  },
  plotOptions: {
    bar: {
      borderRadius: 4,
      horizontal: false,
      columnWidth: "55%",
      endingShape: "rounded",
    },
  },
  dataLabels: {
    enabled: true,
  },
  stroke: {
    show: true,
    width: 2,
    colors: ["transparent"],
  },
  xaxis: {
    title: {
      text: "Departamentos",
    },
    categories: ["Cozinha", "Armazém", "Escritório", "Manutenção"],
  },
  yaxis: {
    title: {
      text: "Quantidade de Redzones",
    },
  },
  fill: {
    opacity: 1,
  },
});

const seriesBar = [
  {
    name: "Redzones",
    data: [23, 18, 13, 10],
  },
];

const chartOptionsBar2 = reactive({
  chart: {
    type: "bar",
  },
  plotOptions: {
    bar: {
      borderRadius: 4,
      horizontal: false,
      columnWidth: "55%",
      endingShape: "rounded",
    },
  },
  dataLabels: {
    enabled: true,
  },
  stroke: {
    show: true,
    width: 2,
    colors: ["transparent"],
  },
  xaxis: {
    title: {
      text: "Usuários",
    },
    categories: ["Marcelo", "Gabriel", "Everton", "Dionísio"],
  },
  yaxis: {
    title: {
      text: "Qtde de Redzones",
    },
  },
  fill: {
    opacity: 1,
  },
  colors: "#16a34a",
});

const seriesBar2 = [
  {
    name: "Redzones",
    data: [23, 18, 13, 10],
  },
];

const chartOptionsBar3 = reactive({
  chart: {
    type: "bar",
  },
  plotOptions: {
    bar: {
      borderRadius: 4,
      horizontal: false,
      columnWidth: "55%",
      endingShape: "rounded",
    },
  },
  dataLabels: {
    enabled: true,
  },
  stroke: {
    show: true,
    width: 2,
    colors: ["transparent"],
  },
  xaxis: {
    title: {
      text: "Qtde Redzones",
    },
    categories: ["Marcelo", "Gabriel", "Everton", "Dionísio"],
  },
  yaxis: {
    title: {
      text: "Qtde Departamentos",
    },
  },
  fill: {
    opacity: 1,
  },
  colors: "#ef4444",
});

const seriesBar3 = [
  {
    name: "Redzones",
    data: [23, 18, 13, 10],
  },
];

const seriesLine = [
  {
    name: "Logs",
    data: [10, 20, 15, 30, 25, 35, 40],
  },
];

const chartOptionsLine = reactive({
  chart: {
    type: "line",
    height: 350,
    zoom: {
      enabled: false,
    },
  },
  dataLabels: {
    enabled: false,
  },
  stroke: {
    curve: "smooth",
  },
  title: {
    text: "Quantidade de Logs de uma Redzone nos Últimos 7 Dias",
    align: "left",
  },
  grid: {
    row: {
      colors: ["#f3f3f3", "transparent"],
      opacity: 0.5,
    },
  },
  xaxis: {
    categories: ["Dom", "Seg", "Ter", "Qua", "Qui", "Sex", "Sáb"],
    title: {
      text: "Dias da Semana",
    },
  },
  yaxis: {
    title: {
      text: "Quantidade de Logs",
    },
  },
  colors: ["#082f49"],
});

const seriesLine2 = [
  {
    name: "Logs de Entrada",
    data: [10, 20, 15, 30, 25, 35, 40],
  },
  {
    name: "Logs de Saída",
    data: [5, 15, 10, 20, 20, 25, 30],
  },
];

const chartOptionsLine2 = reactive({
  chart: {
    type: "line",
    height: 350,
    zoom: {
      enabled: false,
    },
  },
  dataLabels: {
    enabled: false,
  },
  stroke: {
    curve: "smooth",
  },
  title: {
    text: "Quantidade de Logs de Entrada e Saída de uma Redzone nos Últimos 7 Dias",
    align: "left",
  },
  grid: {
    row: {
      colors: ["#f3f3f3", "transparent"],
      opacity: 0.5,
    },
  },
  xaxis: {
    categories: ["Dom", "Seg", "Ter", "Qua", "Qui", "Sex", "Sáb"],
    title: {
      text: "Dias da Semana",
    },
  },
  yaxis: {
    title: {
      text: "Quantidade de Logs",
    },
  },
  colors: ["#4ade80", "#dc2626"],
  tooltip: {
    y: {
      formatter: (val: number) => `${val} logs`,
    },
  },
});
</script>
