import { OpenAICompatibleChatLanguageModel } from '@ai-sdk/openai-compatible';
import type { LanguageModelV4 } from '@ai-sdk/provider';
import {
  serializeModelOptions,
  WORKFLOW_DESERIALIZE,
  WORKFLOW_SERIALIZE,
} from '@ai-sdk/provider-utils';
import type { InferenceCoopChatModelId } from './inference-coop-chat-language-model-options';

type InferenceCoopChatConfig = ConstructorParameters<
  typeof OpenAICompatibleChatLanguageModel
>[1];

/**
 * Inference Cooperative chat completions over the OpenAI-compatible protocol.
 * The gateway speaks standard OpenAI chat completions, so the shared
 * OpenAI-compatible implementation is used unchanged.
 */
export class InferenceCoopChatLanguageModel
  extends OpenAICompatibleChatLanguageModel
  implements LanguageModelV4
{
  static [WORKFLOW_SERIALIZE](model: InferenceCoopChatLanguageModel) {
    return serializeModelOptions({
      modelId: model.modelId,
      config: model.config,
    });
  }

  static [WORKFLOW_DESERIALIZE](options: {
    modelId: InferenceCoopChatModelId;
    config: InferenceCoopChatConfig;
  }) {
    return new InferenceCoopChatLanguageModel(options.modelId, options.config);
  }
}
