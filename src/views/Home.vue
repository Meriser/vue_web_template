<script setup lang="ts">
import { reactive } from "vue";
import { useRouter } from "vue-router";
import { useAuthStore } from "@/stores/auth";
import { User, Setting, Document, SwitchButton } from "@element-plus/icons-vue";

const dialog = reactive({
  user: false,
  settings: false,
  reports: false,
});

const router = useRouter();
const authStore = useAuthStore();

function openDialog(type: "user" | "settings" | "reports") {
  dialog[type] = true;
}

function logout() {
  authStore.clearToken();
  router.push("/login");
}
</script>

<template>
  <div class="py-10 px-4">
    <div class="max-w-4xl mx-auto">
      <el-card shadow="hover">
        <template #header>
          <div class="flex justify-between items-center">
            <span class="text-xl font-bold">後台首頁</span>
            <el-button
              type="danger"
              size="small"
              :icon="SwitchButton"
              @click="logout"
            >
              登出
            </el-button>
          </div>
        </template>

        <div class="space-y-4">
          <el-alert
            title="歡迎來到後台管理系統！"
            type="info"
            :closable="false"
          />

          <div class="flex flex-wrap gap-2">
            <el-button
              type="primary"
              :icon="User"
              @click="openDialog('user')"
            >
              用戶管理
            </el-button>
            <el-button
              :icon="Setting"
              @click="openDialog('settings')"
            >
              設定管理
            </el-button>
            <el-button
              type="success"
              :icon="Document"
              @click="openDialog('reports')"
            >
              報表查看
            </el-button>
          </div>
        </div>
      </el-card>

      <!-- 用戶管理 Dialog -->
      <el-dialog
        v-model="dialog.user"
        title="用戶管理"
        width="400"
      >
        <p>這裡將顯示用戶管理相關資訊。</p>
        <template #footer>
          <el-button type="primary" @click="dialog.user = false">
            關閉
          </el-button>
        </template>
      </el-dialog>

      <!-- 設定管理 Dialog -->
      <el-dialog
        v-model="dialog.settings"
        title="設定管理"
        width="400"
      >
        <p>這裡將顯示設定管理相關功能。</p>
        <template #footer>
          <el-button type="primary" @click="dialog.settings = false">
            關閉
          </el-button>
        </template>
      </el-dialog>

      <!-- 報表查看 Dialog -->
      <el-dialog
        v-model="dialog.reports"
        title="報表查看"
        width="400"
      >
        <p>這裡將顯示報表相關資訊。</p>
        <template #footer>
          <el-button type="primary" @click="dialog.reports = false">
            關閉
          </el-button>
        </template>
      </el-dialog>
    </div>
  </div>
</template>
