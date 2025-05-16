<template>
  <div class="contact-view">
    <section class="page-header">
      <div class="container">
        <h1 class="page-title">{{ $t('contactView.title') }}</h1>
        <p class="page-subtitle">{{ $t('contactView.subtitle') }}</p>
      </div>
    </section>

    <section class="contact-content">
      <div class="container">
        <div class="contact-grid">
          <div class="contact-form-container">
            <h2>{{ $t('contactView.form.title') }}</h2>
            <form @submit.prevent="handleSubmit" class="contact-form">
              <div class="form-group">
                <label for="name">{{ $t('contactView.form.nameLabel') }}</label>
                <input type="text" id="name" v-model="formData.name" :placeholder="$t('contactView.form.namePlaceholder')" required />
              </div>
              <div class="form-group">
                <label for="email">{{ $t('contactView.form.emailLabel') }}</label>
                <input type="email" id="email" v-model="formData.email" :placeholder="$t('contactView.form.emailPlaceholder')" required />
              </div>
              <div class="form-group">
                <label for="subject">{{ $t('contactView.form.subjectLabel') }}</label>
                <input type="text" id="subject" v-model="formData.subject" :placeholder="$t('contactView.form.subjectPlaceholder')" required />
              </div>
              <div class="form-group">
                <label for="message">{{ $t('contactView.form.messageLabel') }}</label>
                <textarea id="message" v-model="formData.message" rows="5" :placeholder="$t('contactView.form.messagePlaceholder')" required></textarea>
              </div>
              <button type="submit" class="submit-button" :disabled="isLoading">
                {{ isLoading ? $t('contactView.form.submittingButton') : $t('contactView.form.submitButton') }}
              </button>
            </form>
            <p v-if="formSubmitted" class="form-success-message">{{ $t('contactView.form.successMessage') }}</p>
            <p v-if="formError" class="form-error-message">{{ formError }}</p> <!-- 新增：显示错误信息 -->
          </div>

          
        </div>
      </div>
    </section>
  </div>
</template>

<script setup>
import { ref } from 'vue';
import { useI18n } from 'vue-i18n';
import { submitContactForm } from '../api/contactService'; // 导入 API 服务函数

const { t } = useI18n();

const formData = ref({
  name: '',
  email: '',
  subject: '',
  message: '',
});

const formSubmitted = ref(false);
const formError = ref('');
const isLoading = ref(false);

const handleSubmit = async () => {
  isLoading.value = true;
  formSubmitted.value = false;
  formError.value = '';

  try {
    // 直接调用封装好的 API 函数
    // formData.value 包含 name, email, subject, message，符合 contactService 的期望
    await submitContactForm(formData.value);

    // 提交成功
    formSubmitted.value = true;
    // 可选择重置表单
    // formData.value = { name: '', email: '', subject: '', message: '' };
    setTimeout(() => {
      formSubmitted.value = false;
    }, 5000);

  } catch (error) {
    // 根据错误类型处理错误信息
    if (error.isApiError) {
      // API 返回的错误 (例如 code !== 0 或 HTTP 错误状态)
      formError.value = error.message || t('contactView.form.errorMessageDefault');
    } else if (error.isNetworkError) {
      // 网络错误
      formError.value = error.message || t('contactView.form.errorNetwork');
    } else {
      // 其他未知错误
      console.error('Contact form submission error:', error);
      formError.value = t('contactView.form.errorMessageDefault');
    }
  } finally {
    isLoading.value = false;
  }
};
</script>

<style scoped lang="scss">
.contact-view {
  background-color: var(--color-bg-page); // Use new page background
  padding-top: 2rem; // Add some top padding if header is sticky
  padding-bottom: 5rem;
}

.page-header {
  background-color: transparent; // Make page header transparent, rely on page bg
  padding: 3rem 1.5rem;
  text-align: center;
  margin-bottom: 3rem; // Reduced margin
}

.page-title {
  font-size: 2.5rem; // Adjusted size
  color: var(--color-text-primary);
  margin-bottom: 0.75rem;
  font-weight: 700;
}

.page-subtitle {
  font-size: 1.1rem; // Adjusted size
  color: var(--color-text-secondary);
  max-width: 700px;
  margin: 0 auto 2rem; // Add bottom margin
  line-height: 1.7;
}

.contact-content .container {
  max-width: 1140px; // 统一容器宽度
  // 为了让垂直排列的卡片在页面中不显得过宽，可以考虑减小容器宽度
  // 或者为 .contact-grid 本身设置一个最大宽度
  // 例如: max-width: 800px; margin: 0 auto; (如果希望内容居中且不撑满1140px)
}

.contact-grid {
  display: grid;
  grid-template-columns: 1fr; // 改为单列布局，使子元素垂直堆叠
  gap: 2.5rem; // 行间距保持不变，现在作为垂直间距
  // 如果希望整个网格区域（包含所有卡片）居中且有最大宽度，可以在这里设置
  // max-width: 800px; // 例如
  // margin: 0 auto;   // 例如

  @media (max-width: 992px) {
    gap: 2rem; 
  }
}

.contact-form-container,
.contact-info-container { // 如果 contact-info-container 也需要同样处理，则此规则同时生效
  padding: 2.5rem; 
  background-color: var(--color-bg-card); 
  border-radius: 12px; 
  box-shadow: var(--shadow-lg); 
  // 为 contact-form-container (以及 contact-info-container 如果存在且需要) 设置最大宽度并居中
  max-width: 720px; // 您可以根据需要调整这个值，例如 600px, 768px 等
  margin-left: auto;   // 使其在 grid 列内水平居中
  margin-right: auto;  // 使其在 grid 列内水平居中
  width: 100%; // 确保在小于 max-width 时仍然是响应式的

  h2 {
    font-size: 1.5rem; // Adjusted H2 size
    margin-bottom: 1.8rem;
    color: var(--color-text-primary); // H2 color
    font-weight: 600;
    padding-bottom: 0.75rem;
    border-bottom: 1px solid var(--color-border-light); // Lighter border
  }
}

.contact-form {
  .form-group {
    margin-bottom: 1.5rem; // Adjusted margin

    label {
      display: block;
      margin-bottom: 0.5rem;
      font-weight: 500;
      font-size: 0.9rem;
      color: var(--color-text-secondary);
    }

    input[type="text"],
    input[type="email"],
    textarea {
      width: 100%;
      padding: 0.8rem 1rem;
      border: 1px solid var(--color-border);
      border-radius: 8px; // Softer radius
      font-size: 0.95rem;
      color: var(--color-text-primary);
      background-color: var(--color-bg-page); // Slightly different bg for inputs
      transition: border-color 0.2s ease, box-shadow 0.2s ease, background-color 0.2s ease;

      &::placeholder {
        color: var(--color-text-muted);
      }

      &:focus {
        outline: none;
        border-color: var(--color-primary);
        background-color: var(--color-bg-card);
        box-shadow: 0 0 0 3px rgba(var(--color-primary-rgb), 0.2);
      }
    }
    
    textarea {
      resize: vertical;
      min-height: 130px;
    }
  }

  .submit-button {
    background-color: var(--color-primary);
    color: var(--color-text-on-primary);
    padding: 0.8rem 2rem;
    border: none;
    border-radius: 8px; // Softer radius
    font-size: 1rem;
    font-weight: 600;
    cursor: pointer;
    transition: background-color 0.2s ease, transform 0.1s ease, box-shadow 0.2s ease;
    box-shadow: var(--shadow-sm);

    &:hover {
      background-color: var(--color-primary-dark);
      transform: translateY(-2px);
      box-shadow: var(--shadow-md);
    }
     &:active {
      transform: translateY(-1px);
      box-shadow: var(--shadow-sm);
    }
  }
}

.form-success-message {
  margin-top: 1.25rem;
  color: var(--color-success); // Use success color
  background-color: var(--color-success-light); // Use light success bg
  padding: 0.8rem 1rem;
  border-radius: 8px;
  border: 1px solid var(--color-success);
  font-size: 0.9rem;
  text-align: center;
}

.contact-info-container {
  .info-item {
    margin-bottom: 2rem;
    display: flex;
    align-items: center;

    i { // SVG icon container
      font-size: 1rem; // Base size for SVG scaling if needed
      color: var(--color-primary);
      margin-right: 1rem; // Adjusted margin (this was the highlighted line)
      width: 36px; // Slightly larger icon container
      height: 36px;
      flex-shrink: 0;
      display: inline-flex;
      align-items: center;
      justify-content: center;
      background-color: var(--color-primary-light);
      border-radius: 50%;

      svg { // Ensure SVG scales well within the i tag
        width: 18px; // Actual icon size
        height: 18px;
      }
    }
    
    .info-text-content {
        flex: 1;
    }

    h3 {
      font-size: 1.05rem; // Adjusted H3 size
      margin-bottom: 0.3rem;
      color: var(--color-text-primary);
      font-weight: 600;
    }

    p, p a {
      color: var(--color-text-secondary);
      line-height: 1.6;
      margin: 0;
      font-size: 0.9rem;
      
      a {
        color: var(--color-primary); // Ensure links use primary color
        font-weight: 500;
        &:hover {
          color: var(--color-primary-dark);
          text-decoration: underline;
        }
      }
    }
  }
}

.map-placeholder {
  background-color: var(--color-bg-page); // Use page background
  height: 250px;
  border-radius: 8px;
  display: flex;
  align-items: center;
  justify-content: center;
  text-align: center;
  color: var(--color-text-muted);
  margin-top: 1.5rem;
  border: 1px dashed var(--color-border);
  font-style: italic;
  font-size: 0.9rem;
  p {
    margin: 0;
  }
}
</style>