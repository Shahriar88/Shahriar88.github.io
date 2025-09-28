import * as THREE from 'https://unpkg.com/three@0.150.1/build/three.module.js';
import URDFLoader from './urdf_js/URDFLoader.js';

/**
 * Loads a URDF file and returns an array of joint info (name + current value).
 * @param {string} urdfPath - The path to the URDF file
 * @returns {Promise<Array<{name: string, value: number}>>}
 */
export async function getURDFJointStates(urdfPath) {
  return new Promise((resolve, reject) => {
    const manager = new THREE.LoadingManager();
    const loader = new URDFLoader(manager);

    loader.load(
      urdfPath,
      robot => {
        const jointStates = [];

        for (const jointName in robot.joints) {
          const joint = robot.joints[jointName];

          // Skip fixed joints
          if (joint.jointType === 'fixed') continue;
          jointStates.push({
            name: jointName,
            value: joint.jointValue || 0
          });
        }

        resolve(jointStates);
      },
      undefined,
      error => {
        reject(`Failed to load URDF: ${error}`);
      }
    );
  });
}
