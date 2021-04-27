1. What would you add to your solution if you had more time?
- order grouping and grouping options to give the user the ability to see a greater range or orders
- track socket subscription status in more detail instead of just error/data
- look into whether unsubscribing on app background is required / beneficial
- look into improving `messageQueue` eg by using the `seq` parameter to avoid processing messages in an incorrect sequence
- smaller TODOs marked in source

2. What would you have done differently if you knew this page was going to get thousands of views per second vs per week?

Even though the concepts of traffic and page views impacting performance are foreign to mobile, I did run into suboptimal render perf on Android with the frequency of messages coming down. While the naive `messageQueue` solution did help maintain usability (testing Android on an old Nexus5X), this shows a potential issue down the road, when including the module into a larger app. For a short-term investigation, I would focus on tracking unnecessary re-renders, perhaps memoizing selectors. I would also check if running hermes has any impact on perf, as the app in its current state should have no problem running it.

3. What was the most useful feature that was added to the latest version of your chosen language? Please include a snippet of code that shows how you've used it.

Not the latest version, but TS 4.1 included template literal types, which made possible a few tricks to simplify the way we created and consumed async api actions (from [redux-axios-middleware](https://github.com/svrcekmichal/redux-axios-middleware)). While previously we had to specify request/success/failure actiont ypes each time for TS to type them, and then create type helpers that would correctly define payload / meta types for failure and success actions created by the middleware etc., with template literal types we could just use a single action creator:

```
import { AxiosResponse, AxiosError } from 'axios';
import { createAction, createCustomAction } from 'typesafe-actions';

import { SUCCESS, FAIL } from './constants';

const createApiAction = <
  Args extends any[],
  T1 extends string,
  RequestMeta = {}
>(
  requestT: T1,
  requestBuilder: (...args: Args) => APIRequestActionPayload,
  metaBuilder?: (...args: Args) => RequestMeta,
) => <ResponseData = {}>() => {
  const request = createAction(requestT, requestBuilder, metaBuilder)();
  const success = createAction(
    `${requestT}_${SUCCESS}` as `${T1}_${typeof SUCCESS}`,
  )<AxiosResponse<ResponseData>, ApiActionMeta<ReturnType<typeof request>>>();
  const failure = createCustomAction(
    `${requestT}_${FAIL}` as `${T1}_${typeof FAIL}`,
    (error: AxiosError, meta: ApiActionMeta<ReturnType<typeof request>>) => ({
      error,
      meta,
    }),
  );

  return { request, success, failure };
};
```

and then provide type helpers to correctly type dispatch to resolve success action in thunks:

```
  type RequestAction = Extract<
    RootAction,
    { payload: { request: AxiosRequestConfig } }
  >;

  type SuccessApiAction<A extends RequestAction> = Extract<
    RootAction,
    { type: `${A['type']}_${typeof SUCCESS}` }
  >;

  interface RootDispatch extends ThunkDispatch<RootState, {}, RootAction> {
    <A extends RequestAction>(action: A): Promise<SuccessApiAction<A>>;
  }
```

Which allowed: `dispatch(asyncAction.request(payload).then(res => { /* here we know that res is asyncAction.success */}))`

4. How would you track down a performance issue in production? Have you ever had to do this?

For mobile dev, we typically have to rely on profiling and hope for reproducibility. That said, most performance issue I encountered were caught in development, and were most often tied to animations and large lists.

One memorable issue that cropped up only in production was tied to lower-end Android phones restarting our app when user returned to it after taking a photo. This meant the photo is lost and the user cannot complete their task. Fortunately, this issue was easily reproducible (it was also possible to force it using the 'Do not keep activities' dev option). However, after profiling for memory leaks and inspecting our memory footprint, the solution we ended up with was tying into the main activity lifecycle to store and then restore the photo in case the activity was killed by the system.

5. Can you describe common security concerns to consider for a frontend developer?

For mobile development, most concerns revolve around credentials. Ultimately, any API token or service credential can be discovered by a third party, and it is only a matter of deferring this discovery by obfuscating such data, removing it from the bundle and obtaining at runtime, not persisting, using SSL pinning etc. In my experience it was extremely rarely that any such methods were used.

6. How would you improve the API that you just used?

I would not mind an option to limit message rate or request grouping from the server directly, but I understand this might be a compromise of conserving server vs client resources. Other than that, nothing struck me as inconvenient or difficult to work with.