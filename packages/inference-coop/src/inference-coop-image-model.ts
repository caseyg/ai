import { OpenAICompatibleImageModel } from '@ai-sdk/openai-compatible';
import type { ImageModelV4 } from '@ai-sdk/provider';
import { WORKFLOW_DESERIALIZE } from '@ai-sdk/provider-utils';
import type { InferenceCoopImageModelId } from './inference-coop-image-model-options';

type InferenceCoopImageConfig = ConstructorParameters<
  typeof OpenAICompatibleImageModel
>[1];

/**
 * Inference Cooperative image generation over the OpenAI-compatible
 * `/images/generations` endpoint. The gateway returns base64-encoded JPEGs,
 * which the shared OpenAI-compatible implementation handles unchanged.
 *
 * Only deserialization is overridden (to reconstruct this subclass); the
 * inherited serialization static runs in the base class, which owns its
 * private config.
 */
export class InferenceCoopImageModel
  extends OpenAICompatibleImageModel
  implements ImageModelV4
{
  static [WORKFLOW_DESERIALIZE](options: {
    modelId: InferenceCoopImageModelId;
    config: InferenceCoopImageConfig;
  }) {
    return new InferenceCoopImageModel(options.modelId, options.config);
  }
}
