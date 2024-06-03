<template>
  <v-overlay :model-value="loading" class="align-center justify-center">
    <v-progress-circular
      v-model="loading"
      color="primary"
      size="64"
      width="5"
      indeterminate
    />
  </v-overlay>
  <v-container>
    <v-row no-gutters class="d-flex ga-4">
      <v-col v-if="totalRedzones">
        <CardDashboard
          title="Redzones"
          description="Quantidade total de redzones"
          icon="mdi mdi-circle-off-outline"
          :result="totalRedzones"
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
      <v-col v-if="totalUsers">
        <CardDashboard
          title="Usuários"
          description="Quantidade total de usuários"
          icon="fa-users"
          :result="totalUsers"
          :date="new Date().toLocaleTimeString('pt-BR')"
        />
      </v-col>
      <v-divider class="py-1 mt-2"></v-divider>
      <v-responsive width="100%"></v-responsive>
      <v-col v-if="logService.dadosAlternativos">
        <CardDashboard
          title="Redzone com mais logs"
          :description="logService.dadosAlternativos.qtde + ' logs registrados'"
          icon="mdi mdi-circle-off-outline"
          :result="logService.dadosAlternativos.nome"
          sizeResult="text-h5"
          :date="new Date().toLocaleTimeString('pt-BR')"
        />
      </v-col>
      <v-col v-if="userMaisRedzones[1]">
        <CardDashboard
          title="Usuário com mais redzones"
          :description="userMaisRedzones[1] + ' redzones'"
          icon="mdi mdi-account"
          :result="userMaisRedzones[0].nome_usuario"
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
      <v-col v-if="seriesUserType" sm="5">
        <apexchart
          type="pie"
          :options="chartOptionsUserType"
          :series="seriesUserType"
        ></apexchart>
      </v-col>
      <v-col v-if="seriesBarRedzonesDepartamentos" sm="7">
        <apexchart
          type="bar"
          :options="chartOptionsBarRedzonesDepartamentos"
          :series="seriesBarRedzonesDepartamentos"
        ></apexchart>
      </v-col>
      <v-responsive width="100%"></v-responsive>
      <v-col v-if="redzonesUser" sm="6">
        <apexchart
          type="bar"
          :options="chartOptionsBarRedzonesUser"
          :series="seriesBarRedzonesUser"
        ></apexchart>
      </v-col>
      <v-col sm="6">
        <apexchart
          type="bar"
          :options="chartOptionsBarrr"
          :series="seriesBarrr"
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
          :options="chartOptionsLinee"
          :series="seriesLinee"
        ></apexchart>
      </v-col>
    </v-row>
  </v-container>
</template>

<script setup lang="ts">
import { onMounted, reactive, ref } from "vue";
import CardDashboard from "../../components/dashboard/cardDashboard.vue";
import { RedzoneStore, registroRedzoneStore, UsuarioStore } from "../../stores";
import useNotification from "../../stores/notification";

const chartOptionsBarRedzonesDepartamentos = reactive({
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
    categories: [],
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

const seriesBarRedzonesDepartamentos = [
  {
    name: "Redzones",
    data: [],
  },
];

const chartOptionsBarRedzonesUser = reactive({
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
    categories: [],
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

const seriesBarRedzonesUser = reactive([
  {
    name: "Redzones",
    data: [],
  },
]);

const chartOptionsBarrr = reactive({
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
      text: "Qtde Departamentos",
    },
  },
  fill: {
    opacity: 1,
  },
  colors: "#ef4444",
});

const seriesBarrr = [
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

const seriesLinee = [
  {
    name: "Logs de Entrada",
    data: [10, 20, 15, 30, 25, 35, 40],
  },
  {
    name: "Logs de Saída",
    data: [5, 15, 10, 20, 20, 25, 30],
  },
];

const chartOptionsLinee = reactive({
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
    text: "Qtde de Logs de Entrada/Saída de uma Redzone nos Últimos 7 Dias",
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

const notificator = useNotification();
const redzoneService = RedzoneStore();
const usuarioService = UsuarioStore();
const logService = registroRedzoneStore();

const totalRedzones = ref("");
const totalUsers = ref("");
const userMaisRedzones = ref({});
const usersByType = ref();
const redzonesDepartamento = ref();
const redzonesUser = ref();
const loading = ref(false);

function adaptData(data) {
  const totals = {
    "Adm Geral": 0,
    "Gerente de área": 0,
    Guarda: 0,
  };

  const labelMap = {
    ROLE_MANAGER: "Gerente de área",
    Administrador: "Adm Geral",
    "Gerente de área": "Gerente de área",
    ROLE_ADMIN: "Adm Geral",
    ROLE_GUARD: "Guarda",
    Guarda: "Guarda",
  };

  data.forEach((item) => {
    if (Array.isArray(item) && item.length === 2) {
      const [role, count] = item;
      const label = labelMap[role];
      if (label) {
        totals[label] += count;
      }
    }
  });

  return [totals["Adm Geral"], totals["Gerente de área"], totals["Guarda"]];
}

const chartOptionsUserType = reactive({
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

const seriesUserType = ref();

onMounted(async () => {
  loading.value = true;
  try {
    totalRedzones.value = (await redzoneService.getTotalRedzones()).data;
    //
    totalUsers.value = (await usuarioService.getTotalUsuarios()).data;
    //
    userMaisRedzones.value = (
      await usuarioService.getUserMaisRedzones()
    ).data[0];
    //
    usersByType.value = (await usuarioService.getUsersByType()).data;
    seriesUserType.value = adaptData(usersByType.value);
    //
    redzonesDepartamento.value = (
      await redzoneService.getRedzonesByDepartamento()
    ).data;
    redzonesDepartamento.value.forEach((item) => {
      const [label, qtde] = item;
      chartOptionsBarRedzonesDepartamentos.xaxis.categories.push(label);
      seriesBarRedzonesDepartamentos[0].data.push(qtde);
    });
    //
    redzonesUser.value = (await redzoneService.getRedzonesByUser()).data;
    redzonesUser.value.forEach((item) => {
      const [label, qtde] = item;
      chartOptionsBarRedzonesUser.xaxis.categories.push(label);
      seriesBarRedzonesUser[0].data.push(qtde);
    });
    //
    logService.getRedzoneMaisLog();
  } catch (error) {
    notificator.notifyError(error.response.data);
  } finally {
    loading.value = false;
  }
});
</script>
