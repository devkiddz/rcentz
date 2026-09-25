import "server-only";

type ApiSuccess<T> = {
  success: true;
  data: T;
};

type ApiFailure = {
  success: false;
  error: {
    code: string;
    message: string;
  };
};

function getApiBaseUrl() {
  const apiUrl = process.env.RCENTZ_API_URL;

  if (!apiUrl) {
    throw new Error(
      "RCENTZ_API_URL is not configured"
    );
  }

  return apiUrl.replace(/\/$/, "");
}

export async function rcentzApiGet<T>(
  path: string
): Promise<T> {
  const response = await fetch(
    `${getApiBaseUrl()}${path}`,
    {
      headers: {
        Accept: "application/json",
      },
      next: {
        revalidate: 300,
      },
    }
  );

  const payload = (await response.json()) as
    | ApiSuccess<T>
    | ApiFailure;

  if (!response.ok || !payload.success) {
    const message =
      "error" in payload
        ? payload.error.message
        : "Rcentz API request failed";

    throw new Error(message);
  }

  return payload.data;
}