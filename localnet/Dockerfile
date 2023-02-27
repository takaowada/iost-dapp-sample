# iost-node image
FROM --platform=linux/amd64/v8 iostio/iost-node

# Node.js
ARG node_ver=16.9.1
ARG node_path=/usr/local/lib/nodejs
ARG node_file_name=node-v${node_ver}-linux-x64

# PATH
# (/usr/local/lib/nodejs/node-v14.15.1-linux-x64/)
ENV PATH ${node_path}/${node_file_name}/bin:$PATH

RUN apt-get update \
  # Required packages
  && apt-get install -y ca-certificates curl xz-utils \
  # Download Node.js
  && curl https://nodejs.org/dist/v${node_ver}/${node_file_name}.tar.xz > ${node_file_name}.tar.xz \
  # Extract Node.js archive to /usr/local/lib/nodejs/node-v14.15.1-linux-x64/
  && mkdir -p $node_path \
  && tar xJvf ${node_file_name}.tar.xz -C $node_path
