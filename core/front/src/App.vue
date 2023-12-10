<template>
  <h1>Сделки</h1>
  <a-table :dataSource="data" :columns="columns" />
</template>

<script lang="ts">
import { defineComponent, ref } from "vue";
import { getLeads } from "./utils/index";
import { ILeads } from "./types";

const data = ref<ReturnType<typeof mapLeadItem>[]>([]);

const mapLeadItem = (lead: ILeads) => ({
  key: lead.id,
  name: lead.name,
  status: lead.status.name,
  statusColor: lead.status.color,
  responsible: lead.responsible_user.name,
  creator: lead.creator.name,
  budget: lead.price,
});

export default defineComponent({
  name: "App",
  created() {
    getLeads().then(async (res) => {
      if (!res.data) {
        window.location.href =
          "https://www.amocrm.ru/oauth?client_id=60cedfe0-be3c-4644-91ab-11570a1459cb";

        return;
      }
      data.value = res.data.map(mapLeadItem);
    });
  },

  setup() {
    return {
      data,
      columns: [
        {
          title: "Название",
          dataIndex: "name",
          key: "name",
        },
        {
          title: "Бюджет",
          dataIndex: "budget",
          key: "budget",
        },
        {
          title: "Статус",
          dataIndex: "status",
          key: "status",
        },
        {
          dataIndex: "statusColor",
          key: "statusColor",
        },
        {
          title: "Создатель",
          dataIndex: "creator",
          key: "creator",
        },
        {
          title: "Ответственный",
          dataIndex: "responsible",
          key: "responsible",
        },
      ],
    };
  },
});
</script>

<style>
h1 {
  margin: 18px;
  text-align: center;
  font-weight: normal;
}
</style>
