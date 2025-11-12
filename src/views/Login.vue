<script setup lang="ts">
import { ref } from "vue";
import { useRouter } from "vue-router";
import { useAuthStore } from "@/stores/auth";
import { User, Lock } from "@element-plus/icons-vue";
import { useForm } from "vee-validate";
import { toTypedSchema } from "@vee-validate/zod";
import { loginSchema, type LoginFormData } from "@/schemas/auth";
import VeeInput from "@/components/vee/VeeInput.vue";

const loading = ref(false);
const error = ref<string | null>(null);

const router = useRouter();
const authStore = useAuthStore();

// 使用 vee-validate + zod
const { handleSubmit } = useForm<LoginFormData>({
  initialValues: {
    account: "",
    password: "",
  },
  validationSchema: toTypedSchema(loginSchema),
});

// 登入邏輯
const login = handleSubmit(async (values) => {
  error.value = null;
  loading.value = true;

  try {
    // 模擬 API 呼叫延遲
    await new Promise((resolve) => setTimeout(resolve, 500));

    if (values.account === "admin" && values.password === "admin") {
      const mockToken = `token_${Date.now()}_${Math.random()
        .toString(36)
        .substring(7)}`;
      authStore.setToken(mockToken);
      // 登入成功後，導向首頁
      router.push("/");
    } else {
      error.value = "帳號或密碼錯誤";
    }
  } catch (e: any) {
    error.value = e.message || "登入失敗，請稍後再試";
  } finally {
    loading.value = false;
  }
});
</script>

<template>
  <div
    class="min-h-screen flex items-center justify-center bg-gradient-to-br from-indigo-100 via-blue-50 to-slate-100 p-4"
  >
    <div class="w-full max-w-[440px]">
      <el-card shadow="always" class="rounded-xl">
        <template #header>
          <h2 class="text-center py-2 text-2xl md:text-3xl font-bold text-primary">
            後台系統
          </h2>
        </template>

        <el-form @submit.prevent="login">
          <VeeInput
            name="account"
            label="帳號"
            placeholder="請輸入帳號"
            type="text"
            size="large"
            :prefix-icon="User"
            required
          />

          <VeeInput
            name="password"
            label="密碼"
            placeholder="請輸入密碼"
            type="password"
            size="large"
            :prefix-icon="Lock"
            required
          />

          <el-alert
            v-if="error"
            :title="error"
            type="error"
            :closable="false"
            show-icon
            class="mb-4"
          />

          <el-button
            type="primary"
            size="large"
            native-type="submit"
            :loading="loading"
            class="w-full font-semibold"
          >
            {{ loading ? "登入中..." : "登入" }}
          </el-button>
        </el-form>

        <div class="flex items-center justify-center gap-2 mt-4 opacity-80">
          <el-icon color="#1976D2">
            <svg viewBox="0 0 1024 1024" xmlns="http://www.w3.org/2000/svg">
              <path
                fill="currentColor"
                d="M866.9 169.9L527.1 54.1C523 52.7 517.5 52 512 52s-11 .7-15.1 2.1L157.1 169.9c-8.3 2.8-15.1 12.4-15.1 21.2v482.4c0 8.8 5.7 20.4 12.6 25.9L499.3 968c3.5 2.7 8 4.1 12.6 4.1s9.2-1.4 12.6-4.1l344.7-268.6c6.9-5.4 12.6-17 12.6-25.9V191.1c.2-8.8-6.6-18.3-14.9-21.2zM810 654.3L512 886.5 214 654.3V226.7l298-101.6 298 101.6v427.6z"
              />
              <path
                fill="currentColor"
                d="M402.9 528.8l-77.5-77.5a8.03 8.03 0 0 0-11.3 0l-34 34a8.03 8.03 0 0 0 0 11.3l112.2 112.2a8.03 8.03 0 0 0 11.3 0l297.6-297.6a8.03 8.03 0 0 0 0-11.3l-34-34a8.03 8.03 0 0 0-11.3 0L402.9 528.8z"
              />
            </svg>
          </el-icon>
          <span class="text-xs text-gray-600">僅限管理員使用</span>
        </div>
      </el-card>
    </div>
  </div>
</template>

<style scoped>
:deep(.el-card__header) {
  padding: 1rem 1.5rem;
}

:deep(.el-card__body) {
  padding: 1.5rem;
}
</style>
