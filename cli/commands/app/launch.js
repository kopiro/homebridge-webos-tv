import * as log from '../../log.js';
import chalk from 'chalk';
import WebosTvHelper from '../../../lib/tools/WebosTvHelper.js';

export const command = 'launch <ip> <mac> <appId>';
export const description = 'Launch the app with the specified appId on the TV';
export const builder = {
  timeout: {
    required: false,
    alias: 't',
    type: 'number',
    description: 'The call timeout in ms. Default: 5000ms'
  },
  debug: {
    required: false,
    alias: 'd',
    type: 'boolean',
    description: 'Enable debug output'
  }
};

export const handler = async argv => {
  const {
    ip,
    mac,
    appId,
    timeout,
    debug
  } = argv;

  try {
    log.info(`Trying to launch the app with appId: ${chalk.green.bold(appId)} on the TV (${chalk.yellow(ip)})`);
    let lgTvCtrl = await WebosTvHelper.connect(ip, mac, debug, timeout);
    await lgTvCtrl.launchApp(appId, {});
    log.success(`Launched app with appId: ${chalk.green.bold(appId)}`);
  } catch (err) {
    log.error(err.message);
  }

  process.exit(0);
};
