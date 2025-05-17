<template>
  <div class="home-view">
    <!-- 顶部大标题和副标题 -->
    <section class="hero">
      <h1>{{ t('homeView.title') }}</h1>
      <p class="subtitle">{{ t('homeView.subtitle') }}</p>
      <router-link class="cta-btn" to="/upload">{{ t('homeView.cta') }}</router-link>
    </section>

    <!-- 三步流程 -->
    <section class="steps">
      <div class="step" v-for="n in 3" :key="n">
        <div class="step-num">{{ n }}</div>
        <div>{{ t(`homeView.steps.${n}`) }}</div>
      </div>
    </section>

    <!-- AI特点与优势 -->
    <section class="ai-features">
      <h2>{{ t('homeView.featuresTitle') }}</h2>
      <ul>
        <li v-for="(item, idx) in t('homeView.features', {}, { returnObjects: true })" :key="idx">{{ item }}</li>
      </ul>
    </section>

    <!-- 应用场景 -->
    <section class="use-cases">
      <h2>{{ t('homeView.useCasesTitle') }}</h2>
      <div class="case-list">
        <div class="case-card" v-for="(item, idx) in t('homeView.useCases', {}, { returnObjects: true })" :key="idx">{{ item }}</div>
      </div>
    </section>
  </div>
</template>

<script setup>
import { useI18n } from 'vue-i18n'
const { t } = useI18n()
</script>

<style scoped>
.home-view {
  padding: 0;
  font-family: 'PingFang SC', 'Helvetica Neue', Arial, sans-serif;
  background: #fff;
}
.hero {
  background: linear-gradient(120deg, #f8e7fa 0%, #e0e7ff 100%);
  padding: 3rem 1rem 2rem 1rem;
  text-align: center;
}
.hero h1 {
  font-size: 2.2rem;
  font-weight: bold;
  margin-bottom: 1rem;
}
.subtitle {
  color: #666;
  margin-bottom: 2rem;
}
.cta-btn {
  display: inline-block;
  background: #7c3aed;
  color: #fff;
  padding: 0.8rem 2rem;
  border-radius: 2rem;
  font-size: 1.1rem;
  text-decoration: none;
  margin-top: 1rem;
  transition: background 0.2s;
}
.cta-btn:hover {
  background: #5b21b6;
}
.steps {
  display: flex;
  justify-content: center;
  gap: 2rem;
  margin: 2rem 0;
}
.step {
  background: #f3f4f6;
  border-radius: 1rem;
  padding: 1rem 2rem;
  text-align: center;
  box-shadow: 0 2px 8px #eee;
}
.step-num {
  font-size: 2rem;
  color: #7c3aed;
  font-weight: bold;
}
.ai-features {
  background: #f9fafb;
  padding: 2rem 1rem;
  text-align: center;
}
.ai-features h2 {
  font-size: 1.5rem;
  margin-bottom: 1rem;
}
.ai-features ul {
  list-style: none;
  padding: 0;
  margin: 0 auto;
  max-width: 400px;
  text-align: left;
}
.ai-features li {
  margin-bottom: 0.7rem;
  font-size: 1.1rem;
  padding-left: 1.2em;
  position: relative;
}
.ai-features li:before {
  content: "✔";
  color: #7c3aed;
  position: absolute;
  left: 0;
}
.use-cases {
  padding: 2rem 1rem;
  text-align: center;
}
.case-list {
  display: flex;
  justify-content: center;
  gap: 1.5rem;
  margin-top: 1rem;
}
.case-card {
  background: #fff;
  border: 1px solid #e5e7eb;
  border-radius: 1rem;
  padding: 1.2rem 2rem;
  box-shadow: 0 2px 8px #f3f4f6;
  font-size: 1.1rem;
}
</style>