import * as dat from 'https://cdn.jsdelivr.net/npm/dat.gui@0.7.9/build/dat.gui.module.js';

/**
 * Creates dat.GUI sliders for a URDF robot's movable joints.
 * @param {URDFRobot} robot - The robot instance from URDFLoader
 * @param {Object} [options] - Optional config
 * @param {string} [options.folderName='Joint values'] - GUI folder title
 */
export function createJointSliders(robot, options = {}) {
  const joints = robot.joints;
  const gui = new dat.GUI();
  const folder = gui.addFolder(options.folderName || 'Joint values');

  for (const jointName in joints) {
    const joint = joints[jointName];

    // Skip fixed joints
    if (joint.jointType === 'fixed') continue;

    const jointObj = { value: 0 };

    const lower = joint.limit?.lower ?? -Math.PI;
    const upper = joint.limit?.upper ?? Math.PI;

    folder.add(jointObj, 'value', lower, upper)
      .name(jointName)
      .onChange(val => {
        robot.setJointValue(jointName, val);
      });
  }

  folder.open();
}
