/*
 * SPDX-License-Identifier: Apache-2.0
 *
 * The OpenSearch Contributors require contributions made to
 * this file be licensed under the Apache-2.0 license or a
 * compatible open source license.
 *
 * Any modifications Copyright OpenSearch Contributors. See
 * GitHub history for details.
 */

/*
 * Licensed to Elasticsearch B.V. under one or more contributor
 * license agreements. See the NOTICE file distributed with
 * this work for additional information regarding copyright
 * ownership. Elasticsearch B.V. licenses this file to you under
 * the Apache License, Version 2.0 (the "License"); you may
 * not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *    http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing,
 * software distributed under the License is distributed on an
 * "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
 * KIND, either express or implied.  See the License for the
 * specific language governing permissions and limitations
 * under the License.
 */

// ToDo: Use `THEME_SOURCES` from `src/core/server/rendering/views/theme` to generate the logic below.
import LightTheme from '@elastic/eui/dist/eui_theme_light.json';

const globals: any = typeof window === 'undefined' ? {} : window;

export type Theme = typeof LightTheme;

const DEFAULT_THEME = 'wazuh';

// in the OpenSearch Dashboards app we can rely on this global being defined, but in
// some cases (like jest) the global is undefined
export const tag: string = globals.__osdThemeTag__;
const themeVersion = tag?.replace(/(light|dark)$/, '') || DEFAULT_THEME;
export const version = parseInt(themeVersion.replace(/[^\d]+/g, ''), 10) || 8;
export const darkMode = tag?.endsWith?.('dark');

export let euiLightVars: Theme;
export let euiDarkVars: Theme;
if (themeVersion === 'v7') {
  euiLightVars = require('@elastic/eui/dist/eui_theme_light.json');
  euiDarkVars = require('@elastic/eui/dist/eui_theme_dark.json');
} else if (themeVersion === 'v9') {
  euiLightVars = require('@elastic/eui/dist/eui_theme_v9_light.json');
  euiDarkVars = require('@elastic/eui/dist/eui_theme_v9_dark.json');
} else if (themeVersion === DEFAULT_THEME) {
  euiLightVars = require('@elastic/eui/dist/eui_theme_wazuh_light.json');
  euiDarkVars = require('@elastic/eui/dist/eui_theme_wazuh_light.json');
} else {
  euiLightVars = require('@elastic/eui/dist/eui_theme_next_light.json');
  euiDarkVars = require('@elastic/eui/dist/eui_theme_next_dark.json');
}

/**
 * EUI Theme vars that automatically adjust to light/dark theme
 */
export let euiThemeVars: Theme;
if (darkMode) {
  euiThemeVars = euiDarkVars;
} else {
  euiThemeVars = euiLightVars;
}
