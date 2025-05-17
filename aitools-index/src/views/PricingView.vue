<template>
  <div class="pricing-view">
    <div class="pricing-header">
      <h1>{{ $t('pricingView.title') }}</h1>
      <p class="subtitle">{{ $t('pricingView.subtitle') }}</p>
      
      <!-- 切换按钮 -->
      <div class="billing-toggle">
        <span :class="{ active: billingCycle === 'monthly' }">{{ $t('pricingView.monthly') }}</span>
        <label class="switch">
          <input type="checkbox" v-model="billingCycle" true-value="yearly" false-value="monthly">
          <span class="slider round"></span>
        </label>
        <span :class="{ active: billingCycle === 'yearly' }">{{ $t('pricingView.yearly') }}</span>
        <span class="save-badge" v-if="billingCycle === 'yearly'">{{ $t('pricingView.saveBadge') }}</span>
      </div>
    </div>

    <div class="pricing-cards">
      <!-- 免费版卡片 -->
      <div class="pricing-card">
        <div class="card-header">
          <h2>{{ $t('pricingView.plans.free.title') }}</h2>
          <p class="price">
            <span class="currency">$</span>
            <span class="amount">{{ $t('pricingView.plans.free.price') }}</span>
            <span class="period">/{{ $t('pricingView.monthly') }}</span>
          </p>
          <button class="cta-button">{{ $t('pricingView.plans.free.cta') }}</button>
        </div>
        <div class="card-features">
          <ul>
            <li><i class="check-icon">✓</i> {{ $t('pricingView.plans.free.features.hours') }}</li>
            <li><i class="check-icon">✓</i> {{ $t('pricingView.plans.free.features.languages') }}</li>
            <li><i class="check-icon">✓</i> {{ $t('pricingView.plans.free.features.editing') }}</li>
            <li><i class="check-icon">✓</i> {{ $t('pricingView.plans.free.features.export') }}</li>
            <li><i class="check-icon">✓</i> {{ $t('pricingView.plans.free.features.accuracy') }}</li>
            <li><i class="check-icon">✓</i> {{ $t('pricingView.plans.free.features.support') }}</li>
          </ul>
        </div>
      </div>

      <!-- 基础版卡片 -->
      <div class="pricing-card">
        <div class="card-header">
          <h2>{{ $t('pricingView.plans.basic.title') }}</h2>
          <p class="price">
            <span class="currency">$</span>
            <span class="amount">{{ billingCycle === 'monthly' ? $t('pricingView.plans.basic.price.monthly') : $t('pricingView.plans.basic.price.yearly') }}</span>
            <span class="period">/{{ $t('pricingView.monthly') }}</span>
          </p>
          <p class="billing-note" v-if="billingCycle === 'yearly'">{{ $t('pricingView.plans.basic.yearlyTotal') }}</p>
          <button class="cta-button">{{ $t('pricingView.plans.basic.cta') }}</button>
        </div>
        <div class="card-features">
          <ul>
            <li><i class="check-icon">✓</i> {{ $t('pricingView.plans.basic.features.hours') }}</li>
            <li><i class="check-icon">✓</i> {{ $t('pricingView.plans.basic.features.languages') }}</li>
            <li><i class="check-icon">✓</i> {{ $t('pricingView.plans.basic.features.editing') }}</li>
            <li><i class="check-icon">✓</i> {{ $t('pricingView.plans.basic.features.export') }}</li>
            <li><i class="check-icon">✓</i> {{ $t('pricingView.plans.basic.features.accuracy') }}</li>
            <li><i class="check-icon">✓</i> {{ $t('pricingView.plans.basic.features.support') }}</li>
          </ul>
        </div>
      </div>

      <!-- 专业版卡片 -->
      <div class="pricing-card featured">
        <div class="popular-badge">{{ $t('pricingView.plans.pro.popular') }}</div>
        <div class="card-header">
          <h2>{{ $t('pricingView.plans.pro.title') }}</h2>
          <p class="price">
            <span class="currency">$</span>
            <span class="amount">{{ billingCycle === 'monthly' ? $t('pricingView.plans.pro.price.monthly') : $t('pricingView.plans.pro.price.yearly') }}</span>
            <span class="period">/{{ $t('pricingView.monthly') }}</span>
          </p>
          <p class="billing-note" v-if="billingCycle === 'yearly'">{{ $t('pricingView.plans.pro.yearlyTotal') }}</p>
          <button class="cta-button primary">{{ $t('pricingView.plans.pro.cta') }}</button>
        </div>
        <div class="card-features">
          <ul>
            <li><i class="check-icon">✓</i> {{ $t('pricingView.plans.pro.features.hours') }}</li>
            <li><i class="check-icon">✓</i> {{ $t('pricingView.plans.pro.features.languages') }}</li>
            <li><i class="check-icon">✓</i> {{ $t('pricingView.plans.pro.features.editing') }}</li>
            <li><i class="check-icon">✓</i> {{ $t('pricingView.plans.pro.features.export') }}</li>
            <li><i class="check-icon">✓</i> {{ $t('pricingView.plans.pro.features.accuracy') }}</li>
            <li><i class="check-icon">✓</i> {{ $t('pricingView.plans.pro.features.support') }}</li>
            <li><i class="check-icon">✓</i> {{ $t('pricingView.plans.pro.features.batch') }}</li>
            <li><i class="check-icon">✓</i> {{ $t('pricingView.plans.pro.features.vocabulary') }}</li>
          </ul>
        </div>
      </div>
    </div>

    <!-- 常见问题 -->
    <div class="faq-section">
      <h2>{{ $t('pricingView.faq.title') }}</h2>
      <div class="faq-grid">
        <div class="faq-item">
          <h3>{{ $t('pricingView.faq.questions.usage.title') }}</h3>
          <p>{{ $t('pricingView.faq.questions.usage.answer') }}</p>
        </div>
        <div class="faq-item">
          <h3>{{ $t('pricingView.faq.questions.formats.title') }}</h3>
          <p>{{ $t('pricingView.faq.questions.formats.answer') }}</p>
        </div>
        <div class="faq-item">
          <h3>{{ $t('pricingView.faq.questions.cancel.title') }}</h3>
          <p>{{ $t('pricingView.faq.questions.cancel.answer') }}</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { useI18n } from 'vue-i18n'

const { t } = useI18n()
const billingCycle = ref('monthly')
</script>

<style scoped>
.pricing-view {
  padding: 4rem 2rem;
  max-width: 1200px;
  margin: 0 auto;
  background: #f8f9fa;
}

.pricing-header {
  text-align: center;
  margin-bottom: 3rem;
}

.pricing-header h1 {
  font-size: 2.5rem;
  color: #2c3e50;
  margin-bottom: 1rem;
}

.subtitle {
  font-size: 1.2rem;
  color: #666;
  margin-bottom: 2rem;
}

.billing-toggle {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 1rem;
  margin-bottom: 2rem;
}

.switch {
  position: relative;
  display: inline-block;
  width: 60px;
  height: 34px;
}

.switch input {
  opacity: 0;
  width: 0;
  height: 0;
}

.slider {
  position: absolute;
  cursor: pointer;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: #ccc;
  transition: .4s;
}

.slider:before {
  position: absolute;
  content: "";
  height: 26px;
  width: 26px;
  left: 4px;
  bottom: 4px;
  background-color: white;
  transition: .4s;
}

input:checked + .slider {
  background-color: #2196F3;
}

input:checked + .slider:before {
  transform: translateX(26px);
}

.slider.round {
  border-radius: 34px;
}

.slider.round:before {
  border-radius: 50%;
}

.save-badge {
  background: #4CAF50;
  color: white;
  padding: 0.3rem 0.8rem;
  border-radius: 20px;
  font-size: 0.9rem;
}

.pricing-cards {
  display: flex;
  gap: 1.5rem;
  justify-content: center;
  margin-bottom: 4rem;
  flex-wrap: wrap;
  align-items: stretch;
}

.pricing-card {
  background: white;
  border-radius: 12px;
  padding: 2rem;
  width: 300px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  position: relative;
  transition: transform 0.3s ease;
  display: flex;
  flex-direction: column;
  height: 100%;
  justify-content: flex-start;
  min-height: 520px;
}

.pricing-card:hover {
  transform: translateY(-5px);
}

.pricing-card.featured {
  border: 2px solid #2196F3;
  transform: scale(1.05);
}

.pricing-card.featured:hover {
  transform: scale(1.05) translateY(-5px);
}

.popular-badge {
  position: absolute;
  top: 0;
  right: 20px;
  background: #2196F3;
  color: white;
  padding: 0.5rem 1rem;
  border-radius: 20px;
  font-size: 0.9rem;
  z-index: 2;
}

.card-header {
  text-align: center;
  margin-bottom: 1.5rem;
  padding-bottom: 1.5rem;
  border-bottom: 1px solid #eee;
  padding-top: 2.2rem;
  min-height: 180px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: flex-start;
}

.card-header h2 {
  color: #2c3e50;
  margin-bottom: 1rem;
  font-size: 1.5rem;
}

.price {
  font-size: 3rem;
  color: #2c3e50;
  margin-bottom: 0.5rem;
  display: flex;
  align-items: center;
  justify-content: center;
}

.currency {
  font-size: 1.5rem;
  vertical-align: super;
  margin-right: 0.2rem;
}

.period {
  font-size: 1rem;
  color: #666;
  margin-left: 0.2rem;
}

.billing-note {
  color: #666;
  font-size: 0.9rem;
  margin: 0.5rem 0;
  min-height: 1.5rem;
  display: flex;
  align-items: center;
  justify-content: center;
}

.cta-button {
  width: 100%;
  padding: 0.8rem;
  border: none;
  border-radius: 6px;
  background: #f8f9fa;
  color: #2c3e50;
  font-size: 1.1rem;
  cursor: pointer;
  transition: all 0.3s ease;
  font-weight: 600;
  margin-top: 0.5rem;
  margin-bottom: 0;
  position: relative;
  bottom: 0;
}

.cta-button:hover {
  background: #e9ecef;
  transform: translateY(-2px);
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
}

.cta-button.primary {
  background: #2196F3;
  color: white;
}

.cta-button.primary:hover {
  background: #1976D2;
}

.card-features {
  margin: 1.5rem 0 0 0;
  flex: 1 1 auto;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  min-height: 240px;
}

.card-features ul {
  list-style: none;
  padding: 0;
  margin: 0;
  flex: 1 1 auto;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
}

.card-features li {
  margin-bottom: 1rem;
  color: #666;
  display: flex;
  align-items: center;
  font-size: 0.95rem;
}

.check-icon {
  color: #4CAF50;
  margin-right: 0.5rem;
  font-weight: bold;
}

.faq-section {
  margin-top: 4rem;
  text-align: center;
}

.faq-section h2 {
  color: #2c3e50;
  margin-bottom: 2rem;
}

.faq-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 2rem;
  text-align: left;
}

.faq-item {
  background: white;
  padding: 1.5rem;
  border-radius: 8px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}

.faq-item h3 {
  color: #2c3e50;
  margin-bottom: 0.5rem;
}

.faq-item p {
  color: #666;
  line-height: 1.6;
}

@media (max-width: 1024px) {
  .pricing-cards {
    flex-direction: column;
    align-items: center;
  }

  .pricing-card {
    width: 100%;
    max-width: 350px;
    min-height: auto;
  }

  .pricing-card.featured {
    transform: none;
  }

  .pricing-card.featured:hover {
    transform: translateY(-5px);
  }

  .card-features {
    min-height: auto;
  }
}
</style>