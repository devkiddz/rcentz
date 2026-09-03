import { capturePortfolioScreenshots } from './capture';
import { screenshotProjects } from './config';

async function main() {
  await capturePortfolioScreenshots(
    screenshotProjects
  );
}

main().catch(error => {
  console.error(error);
  process.exitCode = 1;
});
