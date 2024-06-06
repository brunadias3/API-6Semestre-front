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
      <v-col v-if="departamentoService.contagemTotal">
        <CardDashboard
          title="Departamentos"
          description="Quantidade total de departamentos"
          icon="fa-book"
          :result="departamentoService.contagemTotal"
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
      <v-col v-if="userMaisDepartamentos">
        <CardDashboard
          title="Usuário com mais departamentos"
          :description="userMaisDepartamentos[0][1] + ' departamentos registrados'"
          icon="mdi mdi-account"
          :result="userMaisDepartamentos[0][0].nome_usuario"
          sizeResult="text-h5"
          :date="new Date().toLocaleTimeString('pt-BR')"
        />
      </v-col>
      <v-col v-if="departamentoService.departamentosMostRedzones">
        <CardDashboard
          title="Departamento com mais redzones"
          :description="departamentoService.departamentosMostRedzones[1] + ' redzones registradas'"
          icon="fa-book"
          :result="departamentoService.departamentosMostRedzones[0].nome_departamento"
          sizeResult="text-h5"
          :date="new Date().toLocaleTimeString('pt-BR')"
        />
      </v-col>
    </v-row>
    <v-divider class="py-2 mt-5"></v-divider>
    <v-row>
      <v-col v-if="seriesUserType" cols="6">
        <apexchart
          type="pie"
          :options="chartOptionsUserType"
          :series="seriesUserType"
        ></apexchart>
      </v-col>
      <v-col v-if="seriesBarRedzonesDepartamentos" cols="6">
        <apexchart
          type="bar"
          :options="chartOptionsBarRedzonesDepartamentos"
          :series="seriesBarRedzonesDepartamentos"
        ></apexchart>
      </v-col>
      <v-responsive width="100%"></v-responsive>
      <v-col v-if="redzonesUser" cols="6">
        <apexchart
          type="bar"
          :options="chartOptionsBarRedzonesUser"
          :series="seriesBarRedzonesUser"
        ></apexchart>
      </v-col>
      <v-col v-if="seriesBarDepartamentoUser" cols="6">
        <apexchart
          type="bar"
          :options="chartOptionsBarDepartamentoUser"
          :series="seriesBarDepartamentoUser"
        ></apexchart>
      </v-col>
    </v-row>
    <v-row>
      <v-col cols="5">
        <v-select
          v-model="redzoneSelected"
          :items="redzones"
          item-title="nome_redzone"
          item-value="id_redzone"
          variant="outlined"
          label="Selecione uma redzone"
        ></v-select>
      </v-col>
      <v-col cols="5">
        <VueDatePicker v-model="date" :range="{ maxRange: 15 }"></VueDatePicker>
      </v-col>
      <v-col class="justify-end">
        <v-btn
          color="blue"
          :disabled="!redzoneSelected || !isValidDateRange"
          @click="searchLogs"
          >Pesquisar</v-btn
        >
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
import { computed, onMounted, reactive, ref } from "vue";
import CardDashboard from "../../components/dashboard/cardDashboard.vue";
import {
  departamentoStore,
  RedzoneStore,
  registroRedzoneStore,
  UsuarioStore,
} from "../../stores";
import { Redzone } from "../../types/IRedzone";
import useNotification from "../../stores/notification";
import VueDatePicker from "@vuepic/vue-datepicker";
import "@vuepic/vue-datepicker/dist/main.css";

const chartOptionsBarRedzonesDepartamentos = reactive({
  chart: {
    type: "bar",
  },
  title: {
    text: "Quantidade de redzones por departamento",
    align: "left",
    margin: 10,
    offsetX: 0,
    offsetY: 0,
    floating: false,
    style: {
      fontSize: "14px",
      fontWeight: "bold",
      fontFamily: undefined,
      color: "#263238",
    },
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
      text: "Redzones",
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
  title: {
    text: "Quantidade de redzones por usuário",
    align: "left",
    margin: 10,
    offsetX: 0,
    offsetY: 0,
    floating: false,
    style: {
      fontSize: "14px",
      fontWeight: "bold",
      fontFamily: undefined,
      color: "#263238",
    },
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
      text: "Redzones",
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

const chartOptionsBarDepartamentoUser = reactive({
  chart: {
    type: "bar",
  },
  title: {
    text: "Quantidade de departamentos por usuário",
    align: "left",
    margin: 10,
    offsetX: 0,
    offsetY: 0,
    floating: false,
    style: {
      fontSize: "14px",
      fontWeight: "bold",
      fontFamily: undefined,
      color: "#263238",
    },
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
      text: "Departamentos",
    },
  },
  fill: {
    opacity: 1,
  },
  colors: "#ef4444",
});

const seriesBarDepartamentoUser = [
  {
    name: "Departamentos",
    data: [],
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
const departamentoService = departamentoStore();

const totalRedzones = ref("");
const totalUsers = ref("");
const userMaisRedzones = ref({});
const usersByType = ref();
const redzonesDepartamento = ref();
const redzonesUser = ref();
const userMaisDepartamentos = ref();
const departamentosByUser = ref();
const loading = ref(false);
const redzoneSelected = ref<string | null>(null);
const date = ref<Date[]>();
const logs = ref();
const redzones = ref<Redzone[]>([]);

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

const isValidDateRange = computed(() => {
  return (
    Array.isArray(date.value) &&
    date.value.length === 2 &&
    date.value[0] < date.value[1]
  );
});

const searchLogs = async () => {
  loading.value = true;
  try {
    if (isValidDateRange.value) {
      const startDate = date.value![0].toISOString().split(".")[0];
      const endDate = date.value![1].toISOString().split(".")[0];
      const response = await redzoneService.getRedzoneDates(
        redzoneSelected.value!,
        startDate,
        endDate
      );
      logs.value = response.data.map((log: any) => ({
        id: log.id,
        data: log.data,
        lotacao: log.lotacao,
        entradaAsString: log.entrada ? "Entrada" : "Saida",
        redzoneNome: log.redzoneId.nome_redzone,
      }));
      console.log(response.data);
      // response.data.forEach((log) => {
      //   chartOptionsLine.xaxis.categories.push(log.data);
      //   seriesLine[0].data.push(log);
      // });
      notificator.notifySuccess("Sucesso ao buscar logs!");
    } else {
      notificator.notifyError(
        "Por favor, selecione um intervalo de datas válido."
      );
    }
  } catch (error) {
    notificator.notifyError("Erro ao buscar logs");
  } finally {
    loading.value = false;
  }
};

const getAll = async () => {
  loading.value = true;
  try {
    const response = await redzoneService.getAll();
    redzones.value = response.data;
  } catch (error) {
    notificator.notifyError("Erro ao carregar redzones");
  } finally {
    loading.value = false;
  }
};

onMounted(async () => {
  loading.value = true;
  try {
    totalRedzones.value = (await redzoneService.getTotalRedzones()).data;
    //
    totalUsers.value = (await usuarioService.getTotalUsuarios()).data;
    //
    await departamentoService.getTotalDepartamentos();
    //
    await departamentoService.getDepartamentosMostRedzones();
    //
    userMaisDepartamentos.value = (
      await usuarioService.getUserMostDepartamentos()
    ).data;
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
    departamentosByUser.value = (
      await usuarioService.getDepartamentosPorUsuario()
    ).data;
    departamentosByUser.value.forEach((item) => {
      const [label, qtde] = item;
      chartOptionsBarDepartamentoUser.xaxis.categories.push(label);
      seriesBarDepartamentoUser[0].data.push(qtde);
    });
    //
    await logService.getRedzoneMaisLog();
    //
    await getAll();
    const startDate = new Date();
    startDate.setDate(startDate.getDate() - 7);
    const endDate = new Date();
    date.value = [startDate, endDate];
  } catch (error) {
    notificator.notifyError(error.response.data);
  } finally {
    loading.value = false;
  }
});
</script>
