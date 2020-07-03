import Vue from 'vue';
import Notification from '@/components/core/Notification';

[Notification].forEach(component => {
  Vue.component(component.name, component);
});
